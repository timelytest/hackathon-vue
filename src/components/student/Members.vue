<template>
    <div>
      <el-row style="margin-top: -25px">
        <el-col :pull="12"><p style="font-size: 20px"><strong>成员</strong></p></el-col>
      </el-row>
      <el-row style="margin-top: 20px;margin-left: 13px">
        <el-col :pull="1">
          <el-table :data="studentList" :stripe="true" style="width: 500px;height: 350px">
            <el-table-column prop="student" label="成员" width="350"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'Members',
    props:['issueId'],//课程id
    data(){
      return{
        studentList:[],//成员列表
      }
    },
    methods:{
      initStudentList(){
        let url="/api/student/courses.students";
        this.$axios.get(url,{
          params:{
            "issue_id":this.issueId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.studentList=res.data
        }).catch(error=>{
          console.log(error)
        })
      }

    },
    created () {
        this.initStudentList();
    }
  }
</script>

<style scoped>

</style>
