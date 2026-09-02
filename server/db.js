import initSqlJs from 'sql.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const uploadsDir = join(__dirname, 'uploads')
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })

const dbPath = join(__dirname, 'swimming.db')
let sqlDb = null

class DBWrapper {
  constructor(db) {
    this.db = db
  }

  run(sql, ...params) {
    const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params
    this.db.run(sql, flatParams)
    this.save()
    return { lastInsertRowid: this.db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0 }
  }

  get(sql, ...params) {
    const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params
    const stmt = this.db.prepare(sql)
    stmt.bind(flatParams)
    if (stmt.step()) {
      const cols = stmt.getColumnNames()
      const vals = stmt.get()
      stmt.free()
      const row = {}
      cols.forEach((c, i) => { row[c] = vals[i] })
      return row
    }
    stmt.free()
    return undefined
  }

  all(sql, ...params) {
    const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params
    const stmt = this.db.prepare(sql)
    stmt.bind(flatParams)
    const rows = []
    while (stmt.step()) {
      const cols = stmt.getColumnNames()
      const vals = stmt.get()
      const row = {}
      cols.forEach((c, i) => { row[c] = vals[i] })
      rows.push(row)
    }
    stmt.free()
    return rows
  }

  exec(sql) {
    this.db.run(sql)
    this.save()
  }

  save() {
    const data = this.db.export()
    writeFileSync(dbPath, Buffer.from(data))
  }
}

export let db = null

export async function initDB() {
  const SQL = await initSqlJs()
  let existingData = null
  if (existsSync(dbPath)) {
    existingData = readFileSync(dbPath)
  }
  sqlDb = existingData ? new SQL.Database(existingData) : new SQL.Database()
  db = new DBWrapper(sqlDb)

  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      category TEXT DEFAULT '公告',
      date TEXT,
      image TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      grade TEXT,
      position TEXT,
      category TEXT DEFAULT 'main',
      tags TEXT DEFAULT '[]',
      avatar TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS page_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT,
      UNIQUE(page, key)
    );

    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      subtitle TEXT,
      image TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  const newsCount = db.get('SELECT COUNT(*) as count FROM news').count
  if (newsCount === 0) {
    const newsData = [
      ['我校游泳队在省大学生运动会中斩获3金2银', '在刚刚落幕的省大学生运动会游泳比赛中，我校游泳队运动员发挥出色，共获得3枚金牌、2枚银牌和4枚铜牌的优异成绩。这是我校游泳队近年来取得的最佳战绩。', '在刚刚落幕的省大学生运动会游泳比赛中，我校游泳队运动员发挥出色，共获得3枚金牌、2枚银牌和4枚铜牌的优异成绩。\n\n本次比赛共有来自全省32所高校的300余名运动员参赛。我校游泳队派出18名运动员参加了多个项目的角逐。其中，队长张明远在男子200米自由泳中以1分52秒的成绩夺得金牌，李思涵在女子100米蝶泳中以1分02秒的成绩摘金，混合泳接力队也以优异的表现获得团体金牌。', '赛事', '2026-04-28', ''],
      ['2026年春季校游泳队纳新工作圆满完成', '经过为期两周的选拔与面试，校游泳队2026年春季纳新工作已圆满完成，共有25名新队员正式加入校游泳队大家庭。', '经过为期两周的选拔与面试，校游泳队2026年春季纳新工作已圆满完成，共有25名新队员正式加入校游泳队大家庭。\n\n本次纳新共收到120余份报名申请，经过体能测试、游泳技术考核和面试等环节的严格筛选，最终25名优秀同学脱颖而出。', '队务', '2026-04-15', ''],
      ['校游泳队开展水上安全知识宣传活动', '为提高全校师生的水上安全意识，校游泳队联合校团委开展了水上安全知识宣传活动，现场参与人数超过200人。', '为提高全校师生的水上安全意识，校游泳队联合校团委于4月1日在校园广场开展了水上安全知识宣传活动。\n\n活动现场设置了知识展板、互动体验、急救演示等多个环节。校游泳队的队员们亲自示范了水中自救、岸上急救等实用技能。', '活动', '2026-04-01', ''],
      ['校游泳队2026年春季训练计划发布', '新学期新目标，校游泳队正式发布2026年春季训练计划。本学期将重点加强体能储备和技术细节的打磨。', '新学期新目标，校游泳队正式发布2026年春季训练计划。\n\n本学期将重点加强体能储备和技术细节的打磨，为省大学生运动会做好充分准备。训练计划分为基础期、强化期和赛前期三个阶段，每周训练5次。', '公告', '2026-03-10', ''],
      ['我校游泳队参加全国大学生游泳锦标赛获佳绩', '在2025年全国大学生游泳锦标赛中，我校游泳队运动员不畏强手，勇于拼搏，最终获得1金1银2铜的好成绩。', '在2025年全国大学生游泳锦标赛中，我校游泳队运动员不畏强手，勇于拼搏，最终获得1金1银2铜的好成绩。\n\n本次比赛共有来自全国80余所高校的500余名运动员参赛。队长张明远在男子200米自由泳项目中夺得金牌。', '赛事', '2025-12-20', ''],
      ['校游泳队冬季集训圆满结束', '为期三周的冬季集训圆满结束，队员们在体能和技术方面都取得了显著进步，为新赛季打下坚实基础。', '为期三周的冬季集训圆满结束，队员们在体能和技术方面都取得了显著进步。\n\n本次集训采用封闭式管理模式，训练内容涵盖陆上体能训练、水上技术训练和运动理论学习。', '队务', '2025-02-15', '']
    ]
    for (const item of newsData) {
      db.run('INSERT INTO news (title, excerpt, content, category, date, image) VALUES (?, ?, ?, ?, ?, ?)', item)
    }
  }

  const memberCount = db.get('SELECT COUNT(*) as count FROM members').count
  if (memberCount === 0) {
    const memberData = [
      ['张明远', '大三 · 体育学院', '队长', 'captain', '["自由泳","混合泳"]', ''],
      ['李思涵', '大二 · 体育学院', '副队长', 'captain', '["蝶泳","仰泳"]', ''],
      ['王浩然', '大三 · 计算机学院', '主力', 'main', '["蛙泳","自由泳"]', ''],
      ['陈雨欣', '大二 · 外国语学院', '主力', 'main', '["蝶泳","自由泳"]', ''],
      ['刘子轩', '大二 · 机械学院', '主力', 'main', '["仰泳","混合泳"]', ''],
      ['赵雅琪', '大一 · 艺术学院', '新队员', 'new', '["蛙泳"]', ''],
      ['孙博文', '大一 · 经管学院', '新队员', 'new', '["自由泳"]', ''],
      ['周思远', '大一 · 理学院', '新队员', 'new', '["蝶泳"]', '']
    ]
    for (const item of memberData) {
      db.run('INSERT INTO members (name, grade, position, category, tags, avatar) VALUES (?, ?, ?, ?, ?, ?)', item)
    }
  }

  console.log('数据库初始化完成')
}
