<template>
  <div>
    <el-row style="top: -50px;left:12.5%;width: 75%">
      <el-col>
        <Header></Header>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <list-page v-show="false"/>
        <component is="ShowQuestion"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Header from '@/components/vivo/main/Header'
  import ListPage from '@/components/vivo/main/ListPage'
  import ShowQuestion from '@/components/vivo/main/ShowQuestion'
    export default {
        name: "MainPage",
      components:{Header,ListPage,ShowQuestion},
      data() {
        return {
          input: ''
        }
      }
    }
</script>

<style scoped>

</style>
