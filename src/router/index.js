/*
 * @Author: Ygm
 * @Date: 2023-07-08 00:46:28
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-08 00:46:28
 * @Description: 路由配置
 */
import { createRouter } from "uni-mini-router"
import { createRouterGuard } from "@/router/guard"

const router = createRouter({
  routes: [...ROUTES] // 路由表信息
})

export function setupRouter(app) {
  createRouterGuard(router)
  app.use(router)
}

export { router }
