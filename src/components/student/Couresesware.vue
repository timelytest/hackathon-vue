<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="16" :pull="1">
      <el-table :data="tableData" height="450" border style="width: 100%;">
       <el-table-column prop="name" label="课件名" width="400px"></el-table-column>
        <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button size="mini" type="primary" @click="downWare(scope.row)">下载</el-button>
         </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Couresesware',
    props:['issueId','courseId'],
    data(){
      return{
        name:"软件工程（一）",
        tableData:[],
        fileList: [],
        data:{
          id:this.id
        }
      }
    },
    methods:{
      submitUpload(){
        this.$refs.upload.submit();
        setTimeout(this.initTableData,2000)
      },
      initTableData(){
        let url='/api/create/findcourseware'
        this.$axios.get(url,{
          params:{
            "courseId":this.courseId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data!=[]){
            this.tableData=[]
            for(let index in res.data){
              let path=res.data[index];
              let row= {
                "id":path,
                "name":path.substring(path.lastIndexOf('+')+1)
              }
              this.tableData.push(row);
            }
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      downFile(path){
        let url="/api/file/down"
        //const form = this.getSearchForm() // 要发送到后台的数据
        this.$axios.get(url,{ // 用axios发送post请求
          params:{
            "path":path
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res) => { // 处理返回的文件流
          const content = res
          const blob = new Blob([content])
          const fileName = path.substring(path.lastIndexOf("+")+1)
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      },
      downWare(row){
        this.downFile(row.id);
      }
    },
    created () {
      this.initTableData();
    }
  }
</script>

<style scoped>

</style>
