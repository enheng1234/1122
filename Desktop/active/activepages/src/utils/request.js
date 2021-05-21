/**
 * 封装 axios 请求模块
 */
import axios from "axios"

const request = axios.create({
  baseURL: "http://192.168.1.119:6001/ydk/app/popu" // 基础路径
})

export default request
