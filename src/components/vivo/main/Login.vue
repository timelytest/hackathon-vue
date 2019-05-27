<template>
  <div style="width: 600px;margin: 120px auto auto auto">
    <el-row>
      <p style="font-size:20px;margin-left: 50px;margin-bottom: 50px">账号登陆</p>
    </el-row>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
    <el-form-item label="邮箱" prop="email">
      <el-input type="email" prefix-icon="el-icon-message" v-model="loginForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" prefix-icon="el-icon-view" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 500px" :disabled="emailBool||passwordBool"  @click="submitForm()">登陆</el-button>
    </el-form-item>
    <router-link to="/register" style="font-size: 14px;margin-left: 100px">没有账号， 注册一个</router-link>
  </el-form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var cheakEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        this.emailBool=false;
        callback();
      }
    };
    var cheakPassword = (rule, value, callback) => {
      if(!value){
        return callback(new Error('密码不能为空'));
      }else {
        this.passwordBool=false;
        callback();
      }
    };
    return {
      loginForm:{
        email:'',
        password:''
      },
      rules: {
        email: [
          {validator: cheakEmail, trigger: 'blur'}
        ],
        password: [
          {validator: cheakPassword, trigger: 'blur'}
        ]
      },
      emailBool:true,
      passwordBool:true
    }
  },
  created:function () {
    this.loginForm.email=this.$route.query.user;
  },
  methods: {
    submitForm (){
      let url='/api/user/login';
      this.$axios.get(url, {
        params: {
          'email': this.loginForm.email,
          'password': this.loginForm.password
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=>{
        alert(res.data)
        if(res.data!="fail"){

        }else {
          this.$message.error("登陆失败,请检查用户名或密码")
        }
      }).catch(error=>{
        this.$message.error("登陆失败,未知错误")
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.loginForm{
  width: 600px;
}
</style>
