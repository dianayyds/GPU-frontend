// axios的二次封装 

import axios from "axios";
import { ElMessage } from "element-plus"

//创建axios的实例对象
let request = axios.create({
  //基础路径
  baseURL: 'http://localhost:8080/v1',
  timeout: 50000,
})

request.interceptors.request.use(
    config=>{
		const token = localStorage.getItem('token');
		if(token){
			config.headers.authorization = token //请求头加上token
		}
		return config
	}
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 数据正常，返回数据
    return response
  }, 
  error => {
    ElMessage(
      {
        type: 'error',
        message: "请求失败"
      }
    )
  // 请求失败，触发 reject
  return Promise.reject(error)
})


//暴露
export default request;