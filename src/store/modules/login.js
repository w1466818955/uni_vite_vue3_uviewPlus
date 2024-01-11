/*
 * @Author: Ygm
 * @Date: 2023-07-08 01:18:17
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-08 01:18:17
 * @Description: 登录相关
 */
import { defineStore } from "pinia"
import { setCache, getCache } from "@/utils/cache"

const Cache_Time = 7 * 24 * 60 * 60 * 1000 // 缓存时间
const loginStore = defineStore("login", {
  id: "Login",
  state: () => ({
    token: undefined // 是否登录
  }),

  getters: {
    getToken: (state) => state.token,
    isLogin: (state) => !!state.token,
    getAuthorization: (state) => {
      return state.token ? { authorization: `Bearer ${state.token}` } : {}
    }
  },

  actions: {
    // 初始化token
    initToken() {
      this.token = uni.$getCache("UNI_TOKEN") || undefined
    },
    // 设置token
    setToken(token) {
      uni.$setCache("UNI_TOKEN", token, Cache_Time)
      this.token = token
    },
    // 退出
    async loginOut() {
      uni.removeStorageSync("UNI_TOKEN")
    }
  }
})

export default loginStore
