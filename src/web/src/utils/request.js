import axios from 'axios'
import { Message, Notification } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})
service.post()
/**
 * @param accessUrlPre
 */

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    config.headers.customHeader = 'axios'
    // console.log('请求拦截器config', config)
    return config
  },
  error => {
    // 处理请求错误
    // console.log('请求拦截器error', error) // for debug
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('拦截', res)
    if (res.code !== 0) {
      if (res.code === 401) {
        window.open(res.redirect, '_self')
        return
      }
      if (res.msg) {
        const msg =
          res.msg.length > 50
            ? process.env.VUE_APP_ERROR_MESSAGE_DEFAULT
            : res.msg
        if (process.env.NODE_ENV === 'development') {
          Notification({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: response.config.url + ' ' + res.code + '<br />' + msg,
            type: 'warning',
            showClose: true,
            duration: 0
          })
        } else {
          Message.closeAll()
          Message({
            message: msg,
            type: 'error',
            showClose: true,
            duration: 5 * 1000
          })
        }
      }
      return Promise.reject(res, response)
    } else {
      return res
    }
  },
  error => {
    let msg = process.env.VUE_APP_ERROR_MESSAGE_OTHER
    const status = error.response && error.response.status
    console.log(error.toString() === 'Error: Network Error')
    // console.log('status', status)
    // if (error.toString() === 'Error: Network Error') {
    //   // msg = process.env.VUE_APP_ERROR_MESSAGE_403
    //   store.dispatch('user/logout')
    // }
    if (status === 403) {
      msg = process.env.VUE_APP_ERROR_MESSAGE_403
    }
    if (status === 404) {
      msg = process.env.VUE_APP_ERROR_MESSAGE_404
    }
    if (status === 401) {
      // store.dispatch('user/logout')
    }
    if (status >= 500) {
      msg = process.env.VUE_APP_ERROR_MESSAGE_500
    }
    if (process.env.NODE_ENV === 'development') {
      Notification({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: error.response.config.url + ' ' + status + '<br />' + msg,
        type: 'warning',
        showClose: true,
        duration: 0
      })
    } else {
      Message.closeAll()
      Message({
        message: msg,
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service

/**
 * get 方式可带参 跨域 请求
 * @param {  url: url, data: data, cb: fnName }
 */
export function jsonp({ url, data: params, cb }) {
  return new Promise(resolve => {
    const script = document.createElement('script')
    let arrs = []
    if (params) {
      params = { ...params }
      arrs = params.map((value, index) => {
        return `${index}=${value}`
      })
    }
    if (arrs && arrs.length > 0) {
      script.src = `${url}?${arrs.join('&')}`
    } else {
      script.src = `${url}`
    }
    document.body.appendChild(script)
    // script.remove() ie不支持,采用parentNode()来removeNode()
    script.parentNode.removeChild(script)
    resolve(cb)
  })
}
