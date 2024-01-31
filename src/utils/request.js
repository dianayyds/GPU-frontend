// axios的二次封装 

import axios from "axios";


//创建axios的实例对象
let request = axios.create({
  //基础路径
  baseURL: 'http://localhost:8080/v1',
  timeout: 50000,
})


//暴露
export default request;