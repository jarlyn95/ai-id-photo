/**
 *  使用  两种使用方式
 *    1.{{ msg | timestampToDate(val) }}
 *    2.this.$options.filters.timestampToDate(val)
 */
import { getBrowserInfo } from '@/utils/browserUtil.js'
import { Message } from 'element-ui'
/**
 * 时间戳转时间 yyyy-MM
 * @param {*} val
 */
export function timestampToMonth(val) {
  if (!val) return ''

  const date = new Date(val)
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  return Y + '-' + M
}

/**
 * 时间戳转时间 yyyy-MM-dd
 * @param {*} val
 */
export function timestampToDate(val) {
  if (!val) return ''

  const date = new Date(val)
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return Y + '-' + M + '-' + D
}

/**
 * 时间戳转时间 yyyy-MM-dd HH:mm:ss
 * @param {*} val
 */
export function timestampToTime(val) {
  if (!val) return ''

  const date = new Date(val)
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

/**
 * 时间戳转时间 HH:mm:ss
 * @param {*} v
 */
export function timestampToHHmmss(val) {
  if (!val) return '00:00:00'
  const date = new Date(val)
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return h + ':' + m + ':' + s
}

/**
 * 时间戳转时间+星期 yyyy-MM-dd 星期 X
 * @param {*} val
 */
export function timestampToDateWeek(val) {
  if (!val) return ''

  const date = new Date(val)
  const Y = date.getFullYear()
  const M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const weekDay = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const newDate = new Date(Date.parse(date))
  const result = Y + '-' + M + '-' + D + ' ' + weekDay[newDate.getDay()]
  return result
}

/**
 * 毫秒转分钟 mm分ss秒
 *  @param {*} ms
 */
export function millisecondsToMinutes(ms) {
  if (!ms) return '00分00秒'

  const s = ms / 1000
  const mm = parseInt(s / 60)
  const ss = parseInt(s % 60)
  return mm + '分' + ss + '秒'
}

/**
 * 聊天信息格式化 -> html
 */
export function chatMessageToHtml(text) {
  if (!text) return ''
  return text.replace(/\\n/gm, '<br />')
}

/**
 * 深度拷贝
 */
export function deepCopy(vueObject) {
  return JSON.parse(JSON.stringify(vueObject))
}

/**
 * 判断是否为空
 */
export function isBlank(str) {
  if (str === null || str === '' || typeof str === 'undefined') {
    return true
  }
  return false
}

/**
 * 检验浏览器，用于音视频，拍照
 */
export function browserSuccess() {
  const bType = getBrowserInfo()
  // console.log(bType)
  if (bType === 'Edge' || bType === 'Chrome' || bType === 'Firefox') {
    return true
  } else {
    // this.$message.error('您的浏览器不支持录音和录像功能，请使用Firefox、Chrome、Edge浏览器')
    Message({ message: '您的浏览器不支持语音和拍摄功能，请使用Firefox、Chrome、Edge浏览器', type: 'error' })
    return false
  }
}
