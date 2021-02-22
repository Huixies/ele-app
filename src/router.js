import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/index.vue';
import Home from './views/Home.vue';
import Order from './views/Order.vue';
import Me from './views/Me.vue';
import Address from './views/Address.vue';
import City from './views/City.vue';
import Login from './views/Login.vue';
import Search from './views/Search.vue';
import Shop from './views/Shops/Shop.vue';
import Goods from './views/Shops/Goods.vue';
import Comments from './views/Shops/Comments.vue';
import Seller from './views/Shops/Seller.vue';
import MyAddress from './views/Orders/MyAddress.vue';
import AddAddress from './views/Orders/AddAddress.vue';
import Settlement from './views/Orders/Settlement.vue';
import Remark from './views/Orders/Remark.vue';
import Pay from './views/Orders/Pay.vue';
import OrderInfo from './views/Orders/OrderInfo.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        redirect:'/home'
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/me',
        name: 'me',
        component: Me
      },
      {
        path: '/address',
        name: 'address',
        component: Address
      },
      {
        path: '/city',
        name: 'city',
        component: City
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/shop',
    name: 'shop',
    redirect:'/goods',
    component: Shop,
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: Goods
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      },
      {
        path: '/seller',
        name: 'seller',
        component: Seller
      },
    ]
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    component: MyAddress
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress
  },
  {
    path: '/settlement',
    name: 'settlement',
    component: Settlement
  },
  {
    path: '/remark',
    name: 'remark',
    component: Remark
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: OrderInfo
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:"active",
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next()
  } else {
    //是否在登录状态下
    isLogin ? next() : next('/login')
  }
})

export default router
