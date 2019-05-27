// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.bus=new Vue()
Vue.use(ElementUI)
/*router.beforeEach((to, from, next) =>{
  if(to.path=="/"||to.path=="/register"){
    sessionStorage.setItem("identity","")
    next()
  }else {
    if (sessionStorage.getItem("identity") != null && sessionStorage.getItem("identity") != "") {
      if (sessionStorage.getItem("identity") == "student") {
        if (to.path == "/student") {
          next()
        } else {
          next({path: "/student"})
        }
      } else if (sessionStorage.getItem("identity") == "teacher") {
        if (to.path == "/teacher/mainpage") {
          next()
        } else {
          next({path: "/teacher/mainpage"})
        }
      } else if (sessionStorage.getItem("identity") == "director") {
        if (to.path == "/director") {
          next()
        } else {
          next({path: "/director"})
        }
      } else {
        next({path: "/"})
      }
    } else {
      if (to.path == "/"||to.path=="/register") {
        next()
      }
      sessionStorage.setItem("identity", "")
      next({path: "/"})
    }
  }
})
*/
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

