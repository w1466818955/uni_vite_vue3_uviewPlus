/*
 * @Author: Ygm
 * @Date: 2023-07-07 17:57:21
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-07 17:57:21
 * @Description: pinia统一管理
 */
import { createPinia } from "pinia"
import { createUnistorage } from "pinia-plugin-unistorage"

const pinia = createPinia() // 创建pinia
pinia.use(createUnistorage()) // 数据持久化
export default pinia
