import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const instance = axios.create({
  withCredentials: true
})

// axios.defaults.withCredentials = true
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    const data = response.data
    if (data) {
      return data
    }
  } else {
    return Promise.reject(response)
  }
}, ({
  response
}) => {
  const status = response ? response.status : -1
  let message = '网络异常'
  if (status === 404) {
    message = '404 错误'
  } else if (status === 502) {
    message = '服务端异常'
  }
  response.response = message
  return Promise.reject(response)
})
export default instance
