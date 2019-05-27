<template>
  <div>
    <el-container style="height: 730px; border: 1px solid #eee;width: 1300px;margin: auto">
      <el-aside width="200px" style="background-color: white">
        <div style="width: 200px;height: 150px">
          <img src="@/assets/wang_headpic.jpg" class="person-img">
          <!--<label>{{this.name}}</label>-->
        </div>
        <el-menu :default-openeds="['1','2']" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>课程管理</template>
            <el-menu-item-group>
              <el-menu-item index="MyCourses">我的课程</el-menu-item>
              <el-menu-item index="ChooseCourses">学期选课</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="ModifyMessage">信息修改</el-menu-item>
              <el-menu-item index="CountMessage">信息统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="/" style="font-size: 20px; margin: 20px; ">
            <el-breadcrumb-item>{{title_name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <component class="component" :is="table_view" v-on:changeTable="changeTable" :course="course"></component>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import MyCourses from '@/components/student/MyCourses'
  import ChooseCourses from '@/components/student/ChooseCourses'
  import MyCoursesDetail from '@/components/student/MyCoursesDetail'
  import ModifyMessage from '@/components/student/ModifyMessage'
  import CountMessage from '@/components/student/CountMessage'
  export default {
    name: 'StudentMainPage',
    components:{MyCourses,ChooseCourses,MyCoursesDetail,ModifyMessage,CountMessage},
    data(){
      return{
        table_view:"MyCourses",
        title_name:"我的课程",
        course:[]
      }
    },
    methods:{
      changeTable(table,course){
        this.title_name="课程详情";
        this.course=course;
        this.table_view=table;
      },
      handleSelect(key){
        if(key=="ChooseCourses"){
          this.title_name="学期选课";
        }
        if(key=="MyCoursesDetail"){
          this.title_name="课程详情";
        }
        if(key=="ModifyMessage"){
          this.title_name="信息修改";
        }
        if(key=="CountMessage"){
          this.title_name="信息统计"
        }
        this.table_view=key
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .person-img {
    border-radius: 100%;
    width:140px;
    height:140px;
    margin: 0 auto;
    position:relative;
  }
  .el-main{
    margin: auto;
  }
</style>
