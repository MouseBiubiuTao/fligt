import Vue from 'vue'
import App from './App.vue'

import request from './utils/request'
import requests from './utils/requests'
import elementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
import store from './store'

import axios from 'axios'

Vue.use(elementUI)

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$requests = requests
Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api' //关键代码


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 定义按钮级别权限指令
// 用于控制用户在后台管理系统中的权限
Vue.directive('pomission', {
  inserted(el, binding) {
    // 获取用户权限列表
    const { permissions } = store.state.userInfo;
    // console.log('binding',binding,permissions,store.state)

    // 获取具体功能权限
    if (!permissions[binding.arg]) {
      el.disabled = true;
      el.classList.add('is-disabled')
    }
  }
})

// 全局路由守卫               to 要去的页面，from从哪个页面来的，next 允许通过
router.beforeEach(function (to, from, next) {

  // 判断进入的页面是、manage开头的话，进入程序
  if (to.path.startsWith('/manage')) {
    // 判断是否已登录
    //  本地存储弊端，懂技术用户可以直接修改本地存储添加数据
    if (store.getters.isLogin) {
      // 假设所有的用户都是好人,先放行
      // 如果用户已登录，则校验用户身份
      router.app.$request.get('/user/verify', {
        params: {
          username: store.state.userInfo.username
        },
      }).then(({ data }) => {
        //  如果tonken已失效，退出到login页面
        if (data.code === 401) {
          store.dispatch('logout')
          router.push({
            path: '/login',
            query: {
              // 用户访问的目标页面
              targetUrl: to.fullPath
            }
          })
        }
      })
      next();

    } else {
      router.push({
        path: '/login',
        query: {
          // 用户访问的目标页面
          targetUrl: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})
