/*
 * @Author: Ygm
 * @Date: 2023-07-10 14:51:25
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-10 16:58:05
 * @Description: 公共方法
 */
/**
 * @description 从URL中获取指定参数
 * @param { String } name
 * @scene browser
 * @returns 指定参数
 */
const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  let w = window.location.href.slice(window.location.href.indexOf("?"))
  let r = w.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * @description: 把字节转换成正常文件大小
 * @param {*} size
 * @return {*}
 */
const getFileSize = (size) => {
  if (!size) return "--"
  let num = 1024.0 //byte
  if (size < num) return size + "B"
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "KB" //kb
  if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + "MB" //M
  if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + "G" //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T" //T
}

/**
 * @description: // 随机生成uuid
 * @param {*} len 长度
 * @param {*} radix 基数
 * @return {*}
 */
const uuid = (len, radix) => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"
    uuid[14] = "4"
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join("")
}

/**
 * @description 变量类型检测
 * @param {*} val  任意类型的变量
 * @returns 返回类型
 */
const typeCheck = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

/**
 * @param {String} 开始时间 09:12:00
 * @param {String} 结束时间
 * @description 计算时间长度
 */
const timeLength = (start, end) => {
  let starts = start.split(":")
  let ends = end.split(":")
  let startLong =
    Number(starts[0]) * 60 * 60 * 1000 + Number(starts[1]) * 60 * 1000 + Number(starts[2]) * 1000
  let endLong =
    Number(ends[0]) * 60 * 60 * 1000 + Number(ends[1]) * 60 * 1000 + Number(ends[2]) * 1000
  let result = endLong - startLong
  return result > 0 ? result : 0
}

/**
 * @description: 判断两个对象值是否相等
 * @param {Object} objA
 * @param {Object} objB
 * @return {Boolean}
 */
const isEquals = (objA, objB) => {
  // 将对象键名转化为数组
  const arr1 = Object.keys(objA)
  const arr2 = Object.keys(objB)
  // 比较两个对象的长度
  if (arr1.length !== arr2.length) {
    return false
  }
  // 遍历对象，判断是否相等
  for (let k in objA) {
    // if (objA[k] && objB[k]) {
    if (typeof objA[k] === "object" || typeof objB[k] === "object") {
      if (!isEquals(objA[k], objB[k])) {
        return false
      }
    } else if (objA[k] !== objB[k]) {
      return false
    }
    // }
  }
  return true
}

/**
 * @description: 深拷贝
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {*}
 */
const deepAssign = (obj1, obj2) => {
  let key
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepAssign，
    // 否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] =
      obj1[key] && obj1[key].toString() === "[object Object]"
        ? deepAssign(obj1[key], obj2[key])
        : (obj1[key] = obj2[key])
  }
  return obj1
}

/**
 * @description: 判断某个值是否是null\undefined\[]\{}\""\空格
 * @param value
 * @returns {boolean}
 */
const isEmpty = (value) => {
  if (value === undefined || value === null) {
    return true
  }
  if (Array.isArray(value) && !value.length) {
    return true
  }
  if (typeof value === "object" && !Object.keys(value).length) {
    return true
  }
  if (typeof value === "string" && !value.trim().length) {
    return true
  }
  return false
}

export { getQueryString, getFileSize, uuid, typeCheck, timeLength, isEquals, deepAssign, isEmpty }
