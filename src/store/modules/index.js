/*
 * @Author: Ygm
 * @Date: 2023-07-07 18:02:38
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-07 18:02:38
 * @Description: pinia模块化
 */
import loginStore from "./login"

// 统一导出useStore方法
export default function useStore() {
  return {
    loginStore: loginStore()
  }
}
