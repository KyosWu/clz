import CryptoJS from 'crypto-js'

let date = new Date()
let num1 = Math.random() * 700 + 800
let num2 = (Math.random() * date + num1) * num1
let rands = Math.random() / date * toString(date)

let keyOne = Math.random(date * num1 - rands)
let keyPower = Math.random(date * rands - num1)
let keyUserInfo = Math.random(rands / num1 * date)
let keyToken = Math.random((rands + num1) * date)
let keyRoles = Math.random(rands + (num1 * date))
let ivOne = Math.random(date * num1 - num2)

/**
 * CryptoJS加密
 */
// 加密 函数
function getAesString (data, key, iv) { // 加密
  var key = CryptoJS.enc.Utf8.parse(key)
  var iv = CryptoJS.enc.Utf8.parse(iv)
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString() // 返回的是base64格式的密文
}
// 解密
function getDAesString (encrypted, key, iv) { // 解密
  var key = CryptoJS.enc.Utf8.parse(key)
  var iv = CryptoJS.enc.Utf8.parse(iv)
  var decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// 角色 加密
function getAES (data) { // 加密
  var encrypted = getAesString(data, keyOne, ivOne) // 密文
  var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}
// 角色 加密
function getAESPower (data) { // 加密
  var encrypted = getAesString(data, keyPower, ivOne) // 密文
  var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}
// 账户信息 加密
function getAESUserInfo (data) { // 加密
  var encrypted = getAesString(data, keyUserInfo, ivOne) // 密文
  var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}
//  token 加密
function getAESToken (data) { // 加密
  var encrypted = getAesString(data, keyToken, ivOne) // 密文
  var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}
// 权限 加密
function getAESRoles (data) { // 加密
  var encrypted = getAesString(data, keyRoles, ivOne) // 密文
  var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}

// 解密 通用
function getDAes (data) { // 解密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}

/**
 * 存储localStorage
 */
var setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
var getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
var removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
export default {
  getAES,
  getAESPower,
  getAESUserInfo,
  getAESToken,
  getAESRoles,
  getDAes,
  setStore,
  getStore,
  removeStore
}
