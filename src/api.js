// 工具函数
import config from './config'
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}
function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function(res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModel(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
