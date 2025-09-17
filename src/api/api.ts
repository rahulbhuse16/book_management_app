import axios from 'axios'

const api = axios.create({
  baseURL: 'https://book-api-ux5a.onrender.com/api/books',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

api.interceptors.request.use(
  (config) => {
   
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default api
