import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import multer from 'multer'
import { initDB, db } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(join(__dirname, 'uploads')))
app.use('/admin', express.static(join(__dirname, 'public')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, 'uploads'))
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('仅支持图片格式'))
    }
  }
})

async function startServer() {
  await initDB()

  app.get('/api/news', (req, res) => {
    const { page = 1, limit = 20, category } = req.query
    const offset = (page - 1) * limit
    let query = 'SELECT * FROM news WHERE 1=1'
    const params = []
    if (category && category !== 'all') {
      query += ' AND category = ?'
      params.push(category)
    }
    query += ' ORDER BY date DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), Number(offset))
    const rows = db.all(query, params)
    res.json(rows)
  })

  app.get('/api/news/:id', (req, res) => {
    const row = db.get('SELECT * FROM news WHERE id = ?', [req.params.id])
    if (!row) return res.status(404).json({ error: '新闻不存在' })
    res.json(row)
  })

  app.post('/api/news', (req, res) => {
    const { title, excerpt, content, category, date, image } = req.body
    const result = db.run('INSERT INTO news (title, excerpt, content, category, date, image) VALUES (?, ?, ?, ?, ?, ?)', [title, excerpt, content, category || '公告', date || new Date().toISOString().split('T')[0], image || ''])
    res.json({ id: result.lastInsertRowid, message: '新闻添加成功' })
  })

  app.put('/api/news/:id', (req, res) => {
    const { title, excerpt, content, category, date, image } = req.body
    db.run('UPDATE news SET title=?, excerpt=?, content=?, category=?, date=?, image=? WHERE id=?', [title, excerpt, content, category, date, image, req.params.id])
    res.json({ message: '新闻更新成功' })
  })

  app.delete('/api/news/:id', (req, res) => {
    db.run('DELETE FROM news WHERE id = ?', [req.params.id])
    res.json({ message: '新闻删除成功' })
  })

  app.get('/api/members', (req, res) => {
    const rows = db.all('SELECT * FROM members ORDER BY id ASC')
    res.json(rows)
  })

  app.post('/api/members', (req, res) => {
    const { name, grade, position, category, tags, avatar } = req.body
    const result = db.run('INSERT INTO members (name, grade, position, category, tags, avatar) VALUES (?, ?, ?, ?, ?, ?)', [name, grade, position, category, JSON.stringify(tags || []), avatar || ''])
    res.json({ id: result.lastInsertRowid, message: '队员添加成功' })
  })

  app.put('/api/members/:id', (req, res) => {
    const { name, grade, position, category, tags, avatar } = req.body
    db.run('UPDATE members SET name=?, grade=?, position=?, category=?, tags=?, avatar=? WHERE id=?', [name, grade, position, category, JSON.stringify(tags || []), avatar || '', req.params.id])
    res.json({ message: '队员更新成功' })
  })

  app.delete('/api/members/:id', (req, res) => {
    db.run('DELETE FROM members WHERE id = ?', [req.params.id])
    res.json({ message: '队员删除成功' })
  })

  app.get('/api/content/:page', (req, res) => {
    const rows = db.all('SELECT * FROM page_content WHERE page = ?', [req.params.page])
    const content = {}
    rows.forEach(row => { content[row.key] = row.value })
    res.json(content)
  })

  app.put('/api/content/:page', (req, res) => {
    const { key, value } = req.body
    const existing = db.get('SELECT id FROM page_content WHERE page = ? AND key = ?', [req.params.page, key])
    if (existing) {
      db.run('UPDATE page_content SET value = ? WHERE page = ? AND key = ?', [value, req.params.page, key])
    } else {
      db.run('INSERT INTO page_content (page, key, value) VALUES (?, ?, ?)', [req.params.page, key, value])
    }
    res.json({ message: '内容更新成功' })
  })

  app.get('/api/banners', (req, res) => {
    const rows = db.all('SELECT * FROM banners ORDER BY sort_order ASC')
    res.json(rows)
  })

  app.post('/api/contact', (req, res) => {
    const { name, phone, email, subject, message } = req.body
    db.run('INSERT INTO contacts (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)', [name, phone, email, subject, message])
    res.json({ message: '留言提交成功' })
  })

  app.get('/api/contacts', (req, res) => {
    const rows = db.all('SELECT * FROM contacts ORDER BY created_at DESC')
    res.json(rows)
  })

  app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: '请选择文件' })
    res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename })
  })

  app.get('/api/stats', (req, res) => {
    const newsCount = db.get('SELECT COUNT(*) as count FROM news').count
    const memberCount = db.get('SELECT COUNT(*) as count FROM members').count
    const contactCount = db.get('SELECT COUNT(*) as count FROM contacts').count
    res.json({ news: newsCount, members: memberCount, contacts: contactCount })
  })

  app.listen(PORT, () => {
    console.log(`后端服务已启动: http://localhost:${PORT}`)
    console.log(`后台管理: http://localhost:${PORT}/admin`)
  })
}

startServer()
