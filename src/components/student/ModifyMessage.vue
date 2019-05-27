<template>
  <div style="width: 900px;overflow-x: hidden">
    <el-row type="flex" class="row-bg" justify="center" style="margin-top: 80px;">
      <el-col :span="6" :pull="0">
        <el-tabs tab-position="left" v-model="activeName" style="height: 120px;" @tab-click="changeClick">
          <el-tab-pane label="信息修改" name="1"></el-tab-pane>
          <el-tab-pane label="密码修改" name="2"></el-tab-pane>
          <el-tab-pane label="账号注销" name="3"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="18" :pull="1">
        <div style="margin-left: -200px;" v-show="showMessageBool">
          <el-row style="margin-bottom: 40px">
            <el-col :span="8" :push="2">
              <p style="font-size: 15px"><strong>姓名：</strong></p>
            </el-col>
            <el-col :span="16" :pull="3">
              <el-input prefix-icon="el-icon-edit" type="text" v-model="name" style="width: 400px"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 40px">
            <el-col :span="8" :push="2">
              <p style="font-size: 15px"><strong>学/工号：</strong></p>
            </el-col>
            <el-col :span="16" :pull="3">
              <el-input prefix-icon="el-icon-tickets" type="text" v-model="id" style="width: 400px"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" plain style="width: 400px;margin-left: 70px" @click="modifyMessage">确认修改</el-button>
          </el-row>
        </div>
        <div style="margin-left: -200px;" v-show="showPasswordBool">
          <el-row style="margin-bottom: 40px">
            <el-col :span="8" :push="2">
              <p style="font-size: 15px"><strong>新密码：</strong></p>
            </el-col>
            <el-col :span="16" :pull="3">
              <el-input prefix-icon="el-icon-view" type="password" v-model="password" style="width: 400px"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 40px">
            <el-col :span="8" :push="2">
              <p style="font-size: 15px"><strong>确认密码：</strong></p>
            </el-col>
            <el-col :span="16" :pull="3">
              <el-input prefix-icon="el-icon-view" type="password" v-model="checkPassword" style="width: 400px"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="primary" plain style="width: 400px;margin-left: 70px" @click="modifyPassword">确认修改</el-button>
          </el-row>
        </div>
        <div style="margin-left: -200px;" v-show="showCancelBool">
          <el-row style="margin-bottom: 40px">
            <el-col :span="24" :push="2">
              <el-button type="danger" style="width: 400px;margin-top: 80px;margin-left: -50px" @click="cancelUser">注销该账号</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ModifyMessage',
    data(){
      return{
        activeName:"1",
        name:"",//用户名
        id:"",//学号
        password:"",//新密码
        checkPassword:"",//检验密码
        showMessageBool:true,
        showPasswordBool:false,
        showCancelBool:false
      }
    },
    methods:{
      changeClick(){
        if(this.activeName=="1"){
          this. showMessageBool=true;
          this.showPasswordBool=false;
          this.showCancelBool=false;
        }else if(this.activeName=="2"){
          this.showMessageBool=false;
          this.showPasswordBool=true;
           this.showCancelBool=false;
        }else if(this.activeName=="3"){
          this. showMessageBool=false;
          this.showPasswordBool=false;
          this.showCancelBool=true;
        }
      },
      initData(){
        let url='/api/find.user.message';
        this.$axios.get(url).then(res=>{
          this.name=res.data.name;
          this.id=res.data.number;
        }).catch(error=>{
          console.log(error)
        })
      },
      modifyMessage(){

      },
      modifyPassword(){

      },
      cancelUser(){
        let url='/api/cancel';
        this.$axios.get(url).then(res=>{
          if(res.data==true){
            this.$message({message: '注销成功',type: 'warning'});
            this.$router.push('/')
          }else{
            this.$message.error("注销失败")
          }
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    created () {
      this.initData();
    }
  }
</script>

<style scoped>

</style>
