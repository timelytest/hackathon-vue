<template>
  <el-table :data="tableData" :default-sort = "{prop: 'begin_time', order: 'descending'}" height="500" border style="width: 1000px">
    <el-table-column prop="begin_time" label="课程时间" width="220"></el-table-column>
    <el-table-column prop="name" label="课程名称" width="220"></el-table-column>
    <el-table-column prop="grade" label="课程对象" width="220"></el-table-column>
    <el-table-column prop="time" label="课程教师" width="220"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'MyCourses',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      handleEdit(row) {
        this.$emit('changeTable','MyCoursesDetail',row)
      },
      initTable(){
        let url="/api/student/my.courses";
        this.$axios.get(url)
          .then(res=>{
            this.tableData=res.data
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
