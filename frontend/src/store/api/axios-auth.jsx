import axios from 'axios'
import toastr from "toastr"

const api = (customConfig, token) => {
  const defaultConfig = {
    baseURL: 'https://bibilet-elifhelincarboga.vercel.app/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    }
  }

  const instance = axios.create({ ...defaultConfig, ...customConfig })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        toastr.error(error.response?.data?.error, "Hata!")
      } else if (error.request) {
        toastr.error(error.request, "Hata!")
      } else {
        toastr.error(error.message, "Hata!")
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default api