<template>
  <div>
    <el-col :span="6" :push="3">
      <el-row>
        <el-col :pull="6">
          <span>学霸天地</span>
        </el-col>
      </el-row>
    <el-card class="box-card" v-for="student in students" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{student.name}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">请他帮助</el-button>
      </div>
      <span>信誉积分：{{student.answerPrestige}}</span><br>
      <span>答题数目：{{student.questionNumber}}</span><br>
      <span>辅导数目：{{student.appointmentNumber}}</span>
    </el-card>
    </el-col>
    <el-col :span="12" :push="2">
      <el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="热点问题" name="question"></el-tab-pane>
        <el-tab-pane label="聚焦辅导" name="appointment"></el-tab-pane>
      </el-tabs>
      </el-row>
      <el-row v-show="!showDetail">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            prop="reward">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "ListPage",
        data(){
            return{
              students:[{name:'王某某',questionNumber:'15',appointmentNumber:'25',answerPrestige:'87',email:'161'},{name:'王某某',questionNumber:'15',appointmentNumber:'25',answerPrestige:'87',email:'161'},{name:'王某某',questionNumber:'15',appointmentNumber:'25',answerPrestige:'87',email:'161'}],
              activeName: 'question',
              tableData:[{title:'如何学习java',reward:'25'},{title:'如何学习java',reward:'25'},{title:'如何学习java',reward:'25'}],
              appendixList:[],
              question:{},
              showDetail:false,
            }

        },
      methods: {
        handleClick(tab, event) {
         // console.log(tab, event);
        },
        downAppendix(row){

        },
        handleEdit(row){
          this.showDetail=!this.showDetail;
        }
      }

    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 200px;
    height: 160px;
  }
</style>
