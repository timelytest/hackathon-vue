<template>
  <div style="margin-top:-15px;">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24">
        <el-table :data="tableData" :stripe="true" style="width: 400px;height: 450px;overflow-y:auto;" v-show="!showDetail">
          <el-table-column prop="name" label="作业名" width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="checkDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 400px;margin-top: -10px" v-show="showDetail">
          <div style="height: 430px">
          <el-row>
          <el-col :pull="10">
               <p ><strong>{{assignmentDetail.name}}:</strong></p>
          </el-col>
          </el-row>
          <el-row>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="作业要求" name="1">
              <el-row>
                <p style="text-align: left"> {{ "要求：" +assignmentDetail.message}}</p>
              </el-row>
              <el-row>
                <p style="text-align: left"> {{ "截止日期：" +assignmentDetail.deadline}}</p>
              </el-row>
              <el-row>
                <el-col :span="4">
                <p style="text-align: left"> 附件：</p>
                </el-col>
                <el-col :span="20">
                  <el-table :data="appendixList" :stripe="true" style="width: 300px;height: 150px;overflow-y:auto;">
                    <el-table-column prop="name" label="附件名" width="200"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="downAppendix(scope.row)">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="作业提交" name="2">
              <div style="height: 250px" v-if="!showSubmit">
                <el-row>
                  <p style="text-align: left"> 提交状态：    已提交</p>
                </el-row>
                <el-row>
                  <p style="text-align: left"> 提交时间：    {{submitDetail.time}}</p>
                </el-row>
                <el-row>
                  <p style="text-align: left"> 作业得分：    {{submitDetail.score}}</p>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <p style="text-align: left"> 作业下载：</p>
                  </el-col>
                  <el-col :span="12" :pull="12">
                    <el-button type="text" style="margin-top: 4px" @click="downMyAssignment">点击下载</el-button>
                  </el-col>
                </el-row>
              </div>
              <div v-if="showSubmit" style="height: 250px">
                <el-row>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="/api/assignment/submit.assignment"
                    multiple
                    :before-upload="beforeUpload"
                    :on-success="successSubmit"
                    :data="this.submitID"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip,.doc"
                    style="margin-top: 10px">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传一个文件</div>
                  </el-upload>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          </el-row>
          </div>
          <el-button type="primary" plain style="width: 400px" @click="checkList">返回列表</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Assignment',
    props:['issueId'],
    data(){
      return{
        tableData:[],
        activeName:"1",
        assignmentDetail:{},//作业详情对象
        submitTime:"2017-02-15",//作业提交时间
        showDetail:false,
        appendixList:[],//作业附件列表
        fileList:[],//作业提交列表
        submitID:{},//提交作业得id
        showSubmit:true,//提交作业table
        submitDetail:{},//提交信息存储对象
      }
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
      checkDetail(row){
        this.showDetail=!this.showDetail;
        this.assignmentDetail=row;
        this.getAppendixList(row.id)
        this.initSubmitDetail()
      },
      initTable(){
        let url='/api/assignment/find.assignment.list';
        this.$axios.get(url,{
          params:{
           "course_id":this.issueId
         },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.tableData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      },
      checkList(){
        this.showDetail=!this.showDetail;
      },
      getAppendixList(assignmentId){
        let url='/api/assignment/find.assignment.file.list';
        this.$axios.get(url,{
          params:{
            "assignment_id":assignmentId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.appendixList=[];
          if(res.data!=[]){
            for(let index in res.data) {
              let path = res.data[index];
              let row = {
                "id": path,
                "name": path.substring(path.lastIndexOf('+') + 1)
              }
              this.appendixList.push(row);
            }
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      successSubmit(res, file){
        this.initSubmitDetail();
      },
      initSubmitDetail(){
        let url='/api/assignment/get.student.assignment';
        this.$axios.get(url,{
          params:{
            "assignment_id":this.assignmentDetail.id
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
           //alert("ddd  "+res.data.id)
           if(res.data.id==undefined){
             this.changeTable(true)
           }else{
             this.submitDetail=res.data
             this.changeTable(false)
           }
           //alert(this.showSubmit)
        }).catch(error=>{
          console.log(error)
        })
      },
      beforeUpload(file,fileList){
        //alert(this.assignmentDetail.id)
        let class_id={
          "id":this.assignmentDetail.id
        }
        this.submitID=class_id;
        alert(this.submitID.id)
      },
      changeTable(show){
        this.showSubmit=show;
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
      downMyAssignment(){
        this.downFile(this.submitDetail.path);
      },
      downAppendix(row){
         this.downFile(row.id);
      }

    },
    created () {
      this.initTable();
    }
  }
</script>

<style scoped>

</style>
