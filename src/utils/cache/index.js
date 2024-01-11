/*
 * @Author: Ygm
 * @Date: 2023-07-10 10:12:55
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-10 10:12:55
 * @Description: 基于uniapp的缓存封装（支持过期时间）
 */
import { aes_encrypt, aes_decrypt } from "@/utils/AES"

/**
 *
 * @param {缓存key} key
 * @param {需要存储的缓存值} value
 * @param {过期时间，默认0表示永久有效} expire
 */
export const setCache = (key, value, expire = 0) => {
  let obj = {
    data: aes_encrypt(value + ""), //存储的数据
    time: Date.now() / 1000, //记录存储的时间戳
    expire: expire //记录过期时间，单位秒
  }
  uni.setStorageSync(key, JSON.stringify(obj))
}

/**
 *
 * @param {string} key
 */
export const getCache = (key) => {
  let val = uni.getStorageSync(key)
  if (!val) {
    return null
  }
  val = JSON.parse(val)
  if (val.expire && Date.now() / 1000 - val.time > val.expire) {
    uni.removeStorageSync(key)
    return null
  }
  return aes_decrypt(val.data)
}
