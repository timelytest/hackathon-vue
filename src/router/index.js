import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/vivo/main/Login";
import Register from "../components/vivo/main/Register";
import MainPage from "../components/vivo/main/MainPage";
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    }
    ,{
      path: '/register',
      component:Register
    }
    ,{
      path: '/mainPage',
      component:MainPage
    }
  ],
  mode: 'history'
})
