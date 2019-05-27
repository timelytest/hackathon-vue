<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">列表主页</el-menu-item>
      <el-menu-item index="2">问题查找</el-menu-item>
      <el-menu-item index="3" >辅导发布</el-menu-item>
      <el-menu-item index="4">消息中心</el-menu-item>
      <el-menu-item index="4">个人中心</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "Header",
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
