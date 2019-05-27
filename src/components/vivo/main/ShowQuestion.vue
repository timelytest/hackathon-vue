<template>
  <div>
    <el-row>
      <el-col :span="8" style="margin-top: -5px">
        <span style="font-size: 20px;">王某某</span>
      </el-col>
      <el-col :span="6" :pull="4" >
        <span style="font-size: 15px">发布时间：2017-12-15 10</span>
      </el-col>
      <el-col :span="6" :pull="7" >
        <span style="font-size: 15px">悬赏：25</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :push="3">
        <el-divider><i class="el-icon-user"></i></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :push="4" style="height: 400px">
        <span style="width: 400px;"><p align="left">这是一段测试的内容没很少的撒娇的航空科技示范户类似的技术地方和艰苦拉萨东方航空了解阿道夫阿道夫黄金卡省的浪费了卡迪夫</p></span>
        <el-link type="primary" href="https://www.baidu.com">附件链接</el-link>
      </el-col>
    </el-row>
    <el-row style="top: 50%">
      <el-col :span="18" :push="3">
        <el-divider><i class="el-icon-printer"></i></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="info" style="width:75%">回答问题</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "ShowQuestion",
      data(){
          return{

          }
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
