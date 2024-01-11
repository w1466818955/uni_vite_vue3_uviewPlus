/*
 * @Author: Ygm
 * @Date: 2023-07-08 00:02:04
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-08 00:02:04
 * @Description: 基本配置
 */
import dev from "./env.development"
import pro from "./env.production"

const config = import.meta.env.DEV ? dev : pro
export default {
  ...config, // 基础配置
  isIgnoreLogin: false // 是否忽略登录
}
