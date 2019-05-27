<template>
  <div style="width: 1000px;margin-top: 10px">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :pull="10"><p style="font-size: 20px;"><strong>{{course.name}}</strong></p></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-top: 30px">
      <el-col :span="2" :pull="1">
        <el-tabs tab-position="left" v-model="activeName" style="height: 160px;" @tab-click="changeClick">
          <el-tab-pane label="课件" name="Coursesware"></el-tab-pane>
          <el-tab-pane label="作业" name="Assignment"></el-tab-pane>
          <el-tab-pane label="成员" name="Members"></el-tab-pane>
          <el-tab-pane label="论坛" name="Forum"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <component :is="table_view" :issueId="this.issueId" :courseId="this.courseId" v-show="showComponent"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Coursesware from '@/components/student/Couresesware'
  import Forum from '@/components/student/Forum'
  import Assignment from '@/components/student/Assignment'
  import Members from '@/components/student/Members'
  export default {
    name: 'MyCoursesDetail',
    components: {Coursesware,Forum,Assignment,Members},
    props:['course'] ,
    data(){
      return{
        name:"",
        activeName:'Coursesware',
        courseId:"",
        issueId:"",
        table_view:'Coursesware',
        showComponent:true
      }
    },
    methods:{
      changeClick(){
        this.table_view=this.activeName;
      }
    },
    created () {
      this.courseId=this.course.class_id;
      this.issueId=this.course.id;
    }

  }
</script>

<style scoped>

</style>
