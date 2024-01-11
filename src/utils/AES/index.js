/*
 * @Author: Ygm
 * @Date: 2023-07-10 10:31:09
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-10 10:31:09
 * @Description: AES加密解密
 */
import CryptoJS from "crypto-js"

let keyStr = "hfhfuu8dolv98bt6" //加密密钥(16位)
let ivStr = "yyuuide45678" //矢量

//加密
export function aes_encrypt(word) {
  keyStr = keyStr ? keyStr : "hfhfuu8dolv98bt6"
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var iv = CryptoJS.enc.Utf8.parse(ivStr)
  var encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

//解密
export function aes_decrypt(word) {
  keyStr = keyStr ? keyStr : "hfhfuu8dolv98bt6"
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var iv = CryptoJS.enc.Utf8.parse(ivStr)
  // const restoreBase64 = word.replace(/\-/g,'+').replace(/_/g,'/');
  var restoreBase64 = word.replace(/[\r\n]/g, "")

  var decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
