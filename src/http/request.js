/*
 * @Author: Ygm
 * @Date: 2023-07-07 22:14:58
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-07 22:38:48
 * @Description: 请求封装
 */
import config from "@/config/index.js"
import { getCache } from "@/utils/cache"
import { showMessage } from "./status"

/**
 * @description: 请求拦截器
 * @param {*} options
 * @return {*}
 */
const Interceptor = (options) => {
  const TOKEN = getCache("UNI_TOKEN") // 获取token
  console.log("TOKEN", TOKEN)
  //如果传入loading为true,则显示loading
  if (options.isLoading) {
    uni.showLoading({
      title: "加载中",
      mask: true
    })
  }
  options.url = config.baseURL + options.url
  options.dataType = options.dataType || "json"
  options.header = {
    token: TOKEN,
    ...options.header,
    "Content-Type": "application/json;charset=UTF-8"
  }
  options.data = {
    data: {
      ...options.data
    }
  }
  return options
}

/**
 * @description: 响应拦截器
 * @param {*} res
 * @return {*}
 */
const Responder = (res) => {
  uni.hideLoading()
  if (res && res.data) {
    const { code, result, message } = res.data
    if (code === 200 && result) {
      return Promise.resolve(res.data)
    } else {
      uni.showToast({
        icon: "error",
        title: message || showMessage(code),
        duration: 2000
      })
      return Promise.reject(res.data)
    }
  } else {
    return Promise.reject(res.data)
  }
}

/**
 * @description: 发起请求
 * @param {*} options
 * @return {*}
 */
const request = (options = {}) => {
  options = Interceptor(options) // 1.请求拦截器
  return new Promise((resolve, reject) => {
    // 判断有无网络验证
    uni.getNetworkType({
      success(res) {
        if (res.networkType === "none") {
          uni.showModal({
            title: "没有网络",
            content: "请检查您的网络",
            showCancel: false,
            success: () => {
              uni.hideLoading()
            }
          })
        } else {
          uni.request({
            ...options,
            success: (res) => {
              resolve(Responder(res)) // 2.响应拦截器
            },
            fail: (err) => {
              reject(err)
              uni.hideLoading()
              uni.showToast({
                icon: "none",
                title: "服务连接失败",
                duration: 2000
              })
            }
          })
        }
      }
    })
  })
}

export default {
  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = "GET"
    return request(options)
  },
  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = "POST"
    return request(options)
  }
}
