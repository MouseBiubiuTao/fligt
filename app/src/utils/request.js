import axios from 'axios'

const baseUrl = 'http://120.76.247.5:2003'

// 创建axios实例，实例拥有与axios几乎一致的方法
// 我们可以在创建实例时配置自定义参数
const instance = axios.create({
    // 基础路径，任何请求都基于该地址发出
    baseURL:baseUrl+'/api',
})

//  给需要这个路径的参数 直接用 instance.baseUrl
instance.baseUrl = baseUrl;

// 请求拦截，在请求发送出去之前的操作
// 可以在请求拦截中处理一些公告操作，如在请求头发送token
instance.interceptors.request.use(function(config){
    let userInfo = localStorage.getItem('userInfo'); // null
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {}
}
    //  设置后所有的请求，会自动带上，Authorization
    config.headers.Authorization = userInfo.authorization;
    return config
})

//  响应拦截：在请求回来后，then操作之前执行
// instance.interceptors.response.use(function(response){
//     //  操作response
//     return response
// })

export default instance;