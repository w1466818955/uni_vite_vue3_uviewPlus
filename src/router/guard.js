/*
 * @Author: Ygm
 * @Date: 2023-07-08 02:07:02
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-08 02:07:02
 * @Description: 全局路由守卫
 */
import config from "@/config/index.js" // 引入config配置项
import useStore from "@/store/modules/index" // 引入store

export function createRouterGuard(router) {
  createBeforeEachGuard(router)
  createAfterEachGuard(router)
}

// 路由前置守卫
function createBeforeEachGuard(router) {
  router.beforeEach((to, _, next) => {
    const { loginStore } = useStore()
    if (config.isIgnoreLogin) {
      next() // 如果忽略验证登录直接跳转
    } else if (to && to?.meta?.ignoreAuth) {
      next() // 如果目标路由忽略验证直接跳转
    } else if (!loginStore.isLogin && to && to.name !== "Login") {
      // 如果没有登录且目标路由不是登录页面则跳转到登录页面
      // 将目标路由和参数传入登录页面，登录成功后直接跳转到目标路由，优化体验
      next({
        name: "Login",
        navType: "push",
        params: {
          redirect: to.name,
          ...to.query
        }
      })
    } else if (loginStore.isLogin && to && to.name === "Login") {
      // 如果已经登录且目标页面是登录页面则跳转至首页
      next({ name: "Home", navType: "replaceAll" })
    } else {
      next()
    }
  })
}

// 路由后置守卫
function createAfterEachGuard(router) {
  router.afterEach((to) => {
    if ((to && to?.meta?.ignoreAuth) || config.isIgnoreLogin) return
    const { loginStore } = useStore()
    if (!loginStore.isLogin && to && to.name !== "Login") {
      // 如果没有登录且目标路由不是登录页面则跳转到登录页面
      router.push({ name: "Login", params: { ...to.query } })
    } else if (loginStore.isLogin && to && to.name === "Login") {
      // 如果已经登录且目标页面是登录页面则跳转至首页
      router.replaceAll({ name: "Home" })
    }
  })
}
