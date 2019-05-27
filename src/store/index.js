import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const  state={
  showFooter:false,
  user:"",
  userIdentity:"",
  token:""
}
const getters={
  isShow(state){
    return state.showFooter
  },
  getUser(state){
    return state.user
  },
  getUserIdentity(state){
    return state.userIdentity
  },
  getToken(state){
    return state.token
  }

};
const mutations = {
  show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.showFooter = true;
  },
  hide(state) {  //同上
    state.showFooter = false;
  },
  set_token(state,token){
    state.token=token;
    sessionStorage.token=token
  },
  setUserIdentity(state,identity){
    state.userIdentity=identity;
  },
  del_token(state){
    state.token=""
  },
  delUserIdentity(state){
    state.userIdentity=""
    sessionStorage.token=""
  }
};
const actions = {
  hideFooter(context) {
    context.commit('hide');
  },
  showFooter(context) {  //同上注释
    context.commit('show');
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
