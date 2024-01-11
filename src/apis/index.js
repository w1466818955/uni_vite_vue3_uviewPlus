/*
 * @Author: Ygm
 * @Date: 2023-07-07 22:10:59
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-21 10:24:00
 * @Description: 正则匹配api文件夹下的所有js文件后做的一统一暴露
 */
const modules = import.meta.glob("./api/*.js", { eager: true }) // 批量导入 /api 文件夹下所有js文件
let allModules = {} // 导出的对象
for (const path in modules) {
  let itemKey = path.replace("./api/", "").replace(".js", "") // 模块的名称(有需要可以加上)
  allModules = { ...modules[path], ...allModules } // 对应模块的内容
}

export default allModules
