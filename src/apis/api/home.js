/*
 * @Author: Ygm
 * @Date: 2023-02-23 15:47:48
 * @LastEditors: XSZ_edit
 * @LastEditTime: 2023-04-04 17:01:40
 * @Description: 首页相关接口
 */
import http from "@/http/request.js"

// 考务通知
export const getExamNotice = (data = {}) => {
  return http.post("/home/examNotice", data, { isLoading: true })
}
