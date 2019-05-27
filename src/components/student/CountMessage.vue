<template>
  <div style="width: 900px">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :pull="10"><p style="font-size: 20px;"><strong>个人统计信息 :</strong></p></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注册时间: ' + countData.time }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已 选 课 程: ' + countData.selectCourses+'  门' }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已 退 课 程: ' + countData.dropCourses+'  门' }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已 交 作 业  :   ' + countData.assignment+'  次' }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'CountMessage',
    data(){
      return{
        countData:{
          selectCourses:"",
          dropCourses:"",
          assignment:"",
          time:""
        }
      }
    },
    methods:{
      initTable(){
        let url="/api/student/count.students";
        this.$axios.get(url)
          .then(res=>{
            this.countData=res.data
          }).catch(error=>{
          console.log(error)
        })
      }
    },
    created () {
      this.initTable();
    }
  }
</script>

<style scoped>

</style>
