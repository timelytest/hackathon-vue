<template>
  <div>
    <el-row style="margin-top: -25px">
      <el-col :pull="12"><p style="font-size: 20px"><strong>论坛</strong></p></el-col>
    </el-row>

    <el-row>
      <el-col :pull="10">
        <el-button  plain  icon="el-icon-edit" style="width: 180px;" @click="topicDialog=!topicDialog">添加话题</el-button>
        <el-dialog title="添加话题" :visible.sync="topicDialog" width="450px" top="200px" style="height: 700px">
          <el-input v-model="talk" placeholder="主题" style="margin: auto auto 10px auto"></el-input>
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="talkDetail"></el-input>
          <el-button type="primary"  style="margin:20px auto 5px auto;width: 100%;" @click="addTopic">确认添加</el-button>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;margin-left: 13px">
      <el-col :pull="1">
        <div style="height: 420px;width: 850px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <el-table :data="tableData" :stripe="true" style="width: 100%">
            <el-table-column prop="topic" label="话题" width="250"></el-table-column>
            <el-table-column prop="user" label="发起人" width="250"></el-table-column>
            <el-table-column prop="time" label="时间" width="200"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="checkDetail(scope.row)">详情</el-button>
                <el-button size="mini" type="success" @click="checkReply(scope.row)">回复</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="消息详情" :visible.sync="messageDialog" width="50%" top="160px">
            <p style="height: 100px;width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);overflow-y:scroll;overflow-x:hidden;">{{news}}</p>
            <h1 style="height: 300px;width:  100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);overflow-y:scroll;overflow-x:hidden;">
              <ul>
                <li v-for="topic in replyData" style="margin-left: -35px;width: 103%;height: 150px;list-style:none;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                  <label >
                    <el-row>
                      <el-col :span="12" :pull="2">
                      <p>{{topic.user}}</p>
                      </el-col>
                      <el-col :span="12">
                      <p>{{topic.time}}</p>
                      </el-col>
                    </el-row>
                    <el-row style="overflow-y:scroll;height: 100px">
                      <pre style="font-size: 15px;width: 100%;text-align: left">    {{topic.message}}</pre>
                    </el-row>
                  </label>
                </li>
              </ul>
            </h1>
          </el-dialog>
          <el-dialog title="回复话题" :visible.sync="replyDialog" width="450px" top="200px" style="height: 700px">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="replyMessage"></el-input>
            <el-button type="primary"  style="margin:20px auto 5px auto;width: 100%;" @click="reply">确认回复</el-button>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Forum',
    props:['courseId'],
    data(){
      return{
        tableData:[],
        replyData:[],
        replyMessage:'',
        messageDialog:false,
        replyDialog:false,
        topicDialog:false,
        news:"",
        talk:"",
        talkDetail:"",
        topicId:""
      }
    },
    methods:{
      addTopic(){
        if(this.talk==""||this.talkDetail==""){
          this.$message({
            message: '请完整填写话题信息',
            type: 'warning'
          });
        }else{
          let url='/api/topic/add'
          this.$axios.get(url,{
            params:{
              "courseId":this.courseId,
              "talk":this.talk,
              "talkDetail":this.talkDetail
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res=>{
              if(res.data==true){
                this.$message({ message: '创建成功', type: 'success' });
                this.topicDialog=false;
                this.initTopic(this.courseId);
                //this.initTopic("6");
              }else{
                this.$message.error('话题创建错误');
              }
          }).catch(error=>{
            this.$message.error('话题创建错误');
            console.log(error)
          })
        }

      },
      checkReply(row){
        this.topicId=row.id;
        this.replyDialog=true;
      },
      reply(){
        let url='/api/topic/reply'
        this.$axios.get(url,{
          params:{
            "topicId":this.topicId,
            "message":this.replyMessage
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data==true){
            this.$message({ message: '回复成功', type: 'success' });
            this.replyDialog=false;
            this.initTopic(this.id);
          }else{
            this.$message.error('回复失败');
          }
        }).catch(error=>{
          this.$message.error('回复失败');
          console.log(error)
        })
      },
      checkDetail(row){
        this.messageDialog=!this.messageDialog;
        this.news=row.message;
        this.initReply(row.id);
      },
      initTopic(courseId){
        let url='/api/topic/findtopic'
        this.$axios.get(url,{
          params:{
            "courseId":courseId
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
      initReply(talkId){
        let url='/api/topic/findreply'
        this.$axios.get(url,{
          params:{
            "talkId":talkId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          //console.log(res.data)
          this.replyData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    created () {
      this.initTopic(this.courseId);
    }
  }
</script>

<style scoped>

</style>
