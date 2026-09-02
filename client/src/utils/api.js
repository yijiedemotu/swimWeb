import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getNewsList = (params) => api.get('/news', { params })
export const getNewsDetail = (id) => api.get(`/news/${id}`)
export const getTeamMembers = () => api.get('/members')
export const getPageContent = (page) => api.get(`/content/${page}`)
export const getBanners = () => api.get('/banners')
export const submitContact = (data) => api.post('/contact', data)

export default api
