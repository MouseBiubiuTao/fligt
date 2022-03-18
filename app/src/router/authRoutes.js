
//  引入组件
import Home from '../views/manage/Home.vue';
import Reg from '../views/manage/Reg.vue';

import CorporationList from '../views/manage/corporation/List.vue';
import CorporationEdit from '../views/manage/corporation/Edit.vue';
import CorporationAdd from '../views/manage/corporation/Add.vue';

import CityList from '../views/manage/city/List.vue';
import CityEdit from '../views/manage/city/Edit.vue';
import CityAdd from '../views/manage/city/Add.vue';

import Flight from '../views/manage/flight/Default.vue';
import FlightList from '../views/manage/flight/List.vue';
import FlightEdit from '../views/manage/flight/Edit.vue';
import FlightAdd from '../views/manage/flight/Add.vue';

import User from '../views/manage/user/Default.vue';
import UserList from '../views/manage/user/List.vue';
import UserEdit from '../views/manage/user/Edit.vue';
import UserAdd from '../views/manage/user/Add.vue';

import OrderList from '../views/manage/order/List.vue';
import OrderEdit from '../views/manage/order/Edit.vue';
import OrderAdd from '../views/manage/order/Add.vue';

import Manage from '../views/Manage.vue';

export default {
    path: '/manage',
    component: Manage,
    name: 'Manage',

    children: [
        {
            path: 'home',
            component: Home,
            name: 'Home',
        },
        {
            path: 'reg',
            component: Reg,
            name: 'Reg'
        },
        {
            path: 'corporationlist',
            name: 'CorporationList',
            component: CorporationList,
        },
        {
            path: 'corporationadd',
            name: 'CorporationAdd',
            component: CorporationAdd,
        },
        {
            path: 'corporationedit/:id',
            name: 'CorporationEdit',
            component: CorporationEdit,
        },
        {
            path: 'citylist',
            name: 'CityList',
            component: CityList,
        },
        {
            path: 'cityadd',
            name: 'CityAdd',
            component: CityAdd,
        },
        {
            path: 'cityedit/:id',
            name: 'CityEdit',
            component: CityEdit,
        },
        {
            path: 'flight',
            component: Flight,
            name: 'Flight',
            children: [
                {
                    path: 'list',
                    name: 'FlightList',
                    component: FlightList,
                },
                {
                    path: 'add',
                    name: 'FlightAdd',
                    component: FlightAdd,
                },
                {
                    path: 'edit/:id',
                    name: 'FlightEdit',
                    component: FlightEdit,
                },
            ]
        },
        {
            path: 'user',
            component: User,
            name: 'User',
            children: [
                {
                    path: 'list',
                    name: 'UserList',
                    component: UserList,
                },
                {
                    path: 'add',
                    name: 'UserAdd',
                    component: UserAdd,

                },
                {
                    path: 'edit/:id',
                    name: 'UserEdit',
                    component: UserEdit,
                },
            ]
        },
        {
            path: 'orderlist',
            name: 'OrderList',
            component: OrderList,
        },
        {
            path: 'orderadd',
            name: 'OrderAdd',
            component: OrderAdd,
        },
        {
            path: 'orderedit/:id',
            name: 'OrderEdit',
            component: OrderEdit,
        },]

}
