import Vue from 'vue';
import VueRouter from 'vue-router';

//  引入组件
import Login from '../views/Login.vue'


// 安装路由插件
Vue.use(VueRouter);

// 实例化路由
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'Login'
        },
        {
            //  设置路由重定向
            path:'*',
            redirect:'/login'
        },
    ]
})

// 导出实例
export default router;