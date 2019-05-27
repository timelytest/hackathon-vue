<template>
  <el-upload
    class="upload"
    ref="upload"
    :action="upload_url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip,.doc">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交文件</el-button>
  </el-upload>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        fileList: []
      };
    },
    props:{
        upload_url:String,
        required:true
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file,fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }

  }
</script>
<style scoped>

</style>
