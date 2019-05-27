<template>

  <el-table :data="tableData" :default-sort = "{prop: 'time', order: 'descending'}" height="500" border style="width: 1000px">
    <el-table-column prop="begin_time" label="课程时间" width="220"></el-table-column>
    <el-table-column prop="name" label="课程名" width="220"></el-table-column>
    <el-table-column prop="grade" label="课程对象" width="220"></el-table-column>
    <el-table-column prop="limit_class" label="班次" width="70"></el-table-column>
    <el-table-column prop="limit_student" label="限选人数" width="80"></el-table-column>
    <el-table-column prop="choice_student" label="已选人数" width="80"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="select(scope.row)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'ChooseCourses',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      initTable(){
        let url="/api/student/issue.course.list";
        this.$axios.get(url)
          .then(res=>{
            this.tableData=res.data
          }).catch(error=>{
          console.log(error)
        })
      },
      select(row){
        let url="/api/student/choose.course";
        this.$axios.get(url,{
          params:{
            "issue_id":row.id
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
            if(res.data=='exist'){
              this.$message({message:'你已选择过该课程。',type:'warning'});
            }else if(res.data=='limit'){
              this.$message({message:'课程人数已达上限。',type:'warning'});
            }else{
              this.$message({message:'选课成功。',type:'success'});
            }
            this.initTable();
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
