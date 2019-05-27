<template>
  <div style="margin-top: 80px">
    <el-row>
      <p style="font-size:20px;margin-left: 50px">账号注册</p>
    </el-row>
    <el-row>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="邮箱" prop="email">
          <el-input prefix-icon="el-icon-news" type="email" v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input prefix-icon="el-icon-document" type="text" v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input prefix-icon="el-icon-document" type="text" v-model="registerForm.school" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="id">
          <el-input prefix-icon="el-icon-edit-outline" type="text" v-model="registerForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="school">
          <el-input prefix-icon="el-icon-document" type="text" v-model="registerForm.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="id">
          <el-input prefix-icon="el-icon-edit-outline" type="text" v-model="registerForm.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-view" type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input prefix-icon="el-icon-view" type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="emailBool||passwordBool||checkPasswordBool||idBool"  @click="submitForm()" class="register-button">注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data (){
      var emailRule  = (rule, value, callback) =>{
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
          var njuEmail = value.split('@') ;
          if(njuEmail[1] != 'nju.edu.cn' && njuEmail[1]  != 'smail.nju.edu.cn'){
            return callback(new Error('请输入nju邮箱'));
          } else {
            this.emailBool=false;
            callback();
          }
        }
      };
      var idRule = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('学/工号不能为空'));
        }else{
          this.idBool=false;
          callback();
        }
      }
      var passwordRule  = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('密码不能为空'));
        }else if(value.length<6||value.length>15){
          return callback(new Error('密码长度为6-15位'));
        }else{
          this.passwordBool=false;
          callback();
        }
      };
      var checkPasswordRule  = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('密码不能为空'));
        }else if(value!=this.registerForm.password){
          return callback(new Error('密码不一致'));
        }else{
          this.checkPasswordBool=false;
          callback();
        }
      };
      return {
        registerForm:{
          email:'',
          username:'',
          id:'',
          password:'',
          checkPassword:'',
          school:'',
          grade:'',
          major:''
        },
        rules: {
          email: [
            {validator: emailRule, trigger: 'blur'}
          ],
          id: [
            {validator: idRule, trigger: 'blur'}
          ],
          password: [
            {validator: passwordRule, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: checkPasswordRule, trigger: 'blur'}
          ]
        },
        emailBool:true,
        idBool:true,
        passwordBool:true,
        checkPasswordBool:true,
        captchaBool:true,
        timeLate:false,
        content:'发送验证码',
        totalTime: 60,
        identity: 'student',
        options: [{
          value: 'student',
          label: '学生'
        },{
          value: 'teacher',
          label: '教师'
        }],
      }
    },
    methods: {
      submitForm(){
        //注册
        //alert(this.registerForm.captcha)
        let url='/api/user/register';
        this.$axios.post(url,{
          'email': this.registerForm.email,
          'username': this.registerForm.username,
          'studentId': this.registerForm.id,
          'password': this.registerForm.password,
          'grade':this.registerForm.grade,
          'major':this.registerForm.major,
          'school':this.registerForm.school
        },{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
            alert(res.data)
        }).catch(error=>{
          console.log(error)
        })

      },
      countDown(){
        //验证码发送
        let url='/api/sendcode'
        this.$axios.get(url,{
          params: {
            'email': this.registerForm.email
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data!=true){
            open('请检查邮箱是否正确');
          }
        }).catch(error=>{
          console.log(error);
        })
        //发送倒计时
        this.timeLate=true;
        let clock = window.setInterval(() => {
          this.totalTime--
          if(this.totalTime<0){
            this.timeLate=false;
            window.clearInterval(clock);
            this.content = '重新发送';
            this.totalTime = 60;
          }else
            this.content = this.totalTime + 's'
        },1000)
      },
      test(){
        this.openMessage("kkk")
      },
      openMessage(message) {
        this.$alert(message, '注册错误', {
          confirmButtonText: '确定'
        });
      }
    }


  }
</script>
<style scoped>
  .radio-group{

  }

  .registerForm{
    width: 600px;
    margin: 10px auto;
  }
  .captcha-input{
    float: left;
    width: 70%;
  }
  .captcha-button{
    width: 30%;
    margin: 0 0 auto auto;
  }
  .register-button{
    width: 100%;
  }
</style>
