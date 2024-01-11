import App from "./App.vue"
import { createSSRApp } from "vue"
import uviewPlus from "uview-plus" // 引入uview
import api from "@/apis/index.js" // 引入api文件
import pinia from "@/store/index" // 引入pinia
import config from "@/config/index.js" // 引入config配置项
import { setupRouter } from "@/router" // 引入路由配置
import { setCache, getCache } from "@/utils/cache" // 引入缓存工具
import "virtual:svg-icons-register" // 引入svg图标
import SvgIcon from "@/components/SvgIcon" // 引入svg组件

export function createApp() {
  const app = createSSRApp(App) // 创建vue实例
  setupRouter(app) // 配置路由
  app.use(pinia) // 使用pinia
  app.use(uviewPlus) // 使用uview
  app.component("SvgIcon", SvgIcon) // 注册svg组件

  uni.$api = api // 挂载接口api
  uni.$config = config // 挂载config配置项
  uni.$u.config.unit = "rpx" // 配置uview的单位，使用rpx则需要配置此项
  uni.$setCache = setCache // 挂载setCache设置缓存
  uni.$getCache = getCache // 挂载getCache获取缓存

  return {
    app
  }
}
