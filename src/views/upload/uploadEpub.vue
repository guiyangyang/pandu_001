<template>
    <div class="upload-container">
        <el-row>
            <el-col :span="10" class="upload-left">
              <el-form :model="uploadForm" :rules="rules" ref="uploadForm" label-width="100px" label-position="right" size="mini" autocomplete='on'>
                  <el-form-item label="标题：" prop="title">
                      <el-input v-model="uploadForm.title" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="简介：" prop="introduce">
                      <el-input type="textarea"
                      :autosize="{ minRows: 6, maxRows: 6}"
                       resize='none'
                       clearable
                       v-model="uploadForm.introduce"></el-input>
                  </el-form-item>
                  <el-form-item label="选择分类：" prop="type">
                      <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        change-on-select
                        filterable
                        v-model="uploadForm.type"
                      ></el-cascader>
                  </el-form-item>
                  <el-form-item label="本地书籍：" prop="linktype">
                      <el-row>
                          <el-col :span="16">
                              <el-input v-model="uploadForm.title" 
                                clearable
                                style="width:200px;"></el-input>
                          </el-col>
                          <el-col :span="8">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :limit="1"
                            :file-list="fileList"
                            :before-upload="beforeUpload"
                            style="margin-top:-2px;">
                            <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过100MB</div>
                            <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div> -->
                        </el-upload> 
                          </el-col>
                      </el-row>
                        
                        
                  </el-form-item>
                  <!-- <el-form-item label="网盘类型：" prop="linktype">
                        <el-select v-model="uploadForm.linktype"  placeholder="请选择">
                            <el-option
                            v-for="item in linkTypeLists"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                  </el-form-item>
                  <el-form-item label="链接网址：" prop="link">
                        <el-input 
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 2}"
                        resize="none"
                        v-model="uploadForm.link" ></el-input>
                  </el-form-item>
                  <el-form-item label="分享密码：" prop="pwdRadio">
                    <el-radio-group v-model="uploadForm.pwdRadio">
                       <el-radio  label="1">无</el-radio>
                       <el-radio  label="2">有</el-radio>
                    </el-radio-group> 
                       <el-input :disabled="uploadForm.pwdRadio == 1" v-model="uploadForm.password" style="width:30%;padding:6px !important;"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期限：" prop="effecttime">
                       <el-radio-group v-model="uploadForm.effecttime">
                            <el-radio :label="0">永久</el-radio>
                            <el-radio :label="7">7天</el-radio>
                            <el-radio :label="1">1天</el-radio>
                        </el-radio-group>
                  </el-form-item> -->
                   <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small">立即上传</el-button>
                        <el-button size="small" @click="resetForm">取消重置</el-button>
                        <el-button type="primary" @click="submitUpload" size="small">上传书籍</el-button>
                        
                    </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="14" class="upload-right">
                <el-form :model="uploadForm" :rules="rules" label-width="100px" label-position="right" size="mini" autocomplete='on'>
                    <el-form-item label="封面图："
                    prop="coverImg"
                    hide-required-asterisk="false" class="cover-image">
                      <my-upload ref="uploader" field="file"
                      enctype="multipart/form-data"
                      @crop-success="cropSuccess"
                      v-model="show"
                      :no-circle="true"
                      :width="108"
                      :height="140"
                      
                      img-format="png"></my-upload>
                      <el-button size="small"
                                type="primary"
                                plain
                                @click="toggleShow">选择图片</el-button>
        <!-- <div class="">只能上传jpeg/jpg/png/gif格式的图片，且不超过5M</div> -->
                      <div class="coverImg"><div>预 览</div>
                        <img :src="detailRuleForm.coverImg"></div> 
      </el-form-item>

                    <el-form-item label="示例图：" prop="tipImg">
                       <img src="../../../static/images/books/ajsqn.jpg" alt="">
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { uploadForm, upImg,uploadEpub } from "@/api/uploadForm"
import myUpload from "vue-image-crop-upload";

export default {
    data() {
      const validateLink = (rule, value, callback) => {
        if(value == ''){
          callback(new Error('请输入链接网址'))
        }
        if(value.slice(0,7) == 'http://' || value.slice(0,8) == 'https://'){
             callback()
        }else{
             callback(new Error('请输入正确的链接网址'))
        }
      }
        return {
            fileList:[],
            fileName:'',
            uploadForm:{
            title:'',
            introduce:'',
            type:['books', 'literature'],
            linktype:'bd',
            link:'http://www.baidu.com',
            password:'',
            pwdRadio:'1',
            effecttime:0,
            img:''
          },
          rules:{
            title: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
            ],
            introduce: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 250, message: '长度在 3 到 250 个字符', trigger: 'blur' }
            ],
            type: [
              {required: true, message: '请选择分类', trigger: 'change' }
            ],
            linktype: [
              { required: true, message: '请选择网盘类型', trigger: 'change' }
            ],
            link: [
              { required: true, trigger: 'blur',validator: validateLink }
            ],
            pwdRadio:[
              { required: true, trigger: 'change', }
            ],
            effecttime:[
              { required: true, trigger: 'change', }
            ],
          },
          options: [{
          value: 'books',
          label: '书籍专区',
          children: [{
            value: 'literature',
            label: '文学历史'
          }, 
          {
            value: 'novel',
            label: '小说传记'
          },
          {
            value: 'technology',
            label: '科技时尚'
          },
          {
            value: 'education',
            label: '教育哲学'
          },
          {
            value: 'others',
            label: '其他书籍'
          }]
        },
        // {
        //   value: 'videos',
        //   label: '视频专区',
        //   children: [{
        //     value: 'movies',
        //     label: '电影'
        //   }, {
        //     value: 'teleplay',
        //     label: '电视剧'
        //   }, {
        //     value: 'ITvideo',
        //     label: 'IT视频'
        //   }, {
        //     value: 'interest',
        //     label: '兴趣视频'
        //   }, {
        //     value: 'others',
        //     label: '其他视频'
        //   }]
        // }
        ],
        selectedOptions: ['books', 'literature'],
        checklinktype:null,
        linkTypeLists:[
            {
                label:'百度网盘',
                value:'bd'
            },
            // {
            //     label:'亿方云盘',
            //     value:'yf'
            // },
            // {
            //     label:'腾讯网盘',
            //     value:'tx'
            // }
        ],
        show:false,
        // withCredentials:true,
        // params:{
        //   size:5*1024*1024
        // },
        // headers:{
        //   smail:'11'
        // },
        // zh:{
        //   preview:'预览'
        // },
        // uploadImgUrl:'',
        detailRuleForm:{
          coverImg:''
        }
        }
    },
    components:{
      myUpload
    },
    methods:{
        beforeUpload(file){
        this.files = file;
        const extension = file.name.split('.')[1] === 'epub'
        // const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 20
        if (!extension) {
        this.$message.warning('上传书籍只能是epub格式!')
        return
        }
        if (!isLt2M) {
        this.$message.warning('上传书籍大小不能超过20MB!')
        return
        }
        this.fileName = file.name;
        return false // 返回false不会自动上传
      },
      submitUpload() {
        if(this.fileName == ""){
        this.$message.warning('请选择要上传的书籍！')
        return false
        }
        let fileFormData = new FormData();
        fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
        // fileFormData.append('uploadExplain', this.newUploadForm.uploadExplain);
        // fileFormData.append('dept','this.newUploadForm.dept');
        // fileFormData.append('operator', this.newUploadForm.operator);
       
        // return ;
        uploadEpub(fileFormData).then(res => {
          console.log(res)
          if(res.data.code == '000000'){
            this.$message({
              message:'上传成功',
              type:'success',
              showClose:true
            })
            this.dialogVisibleAdd = false;
          }else{
            this.$message({
              message:'上传失败',
              type:'error',
              showClose:true
            })
            this.fileName = '';
          }
        }).catch(err => {
            this.$message({
              message:'上传失败',
              type:'success',
              showClose:true
            })
            this.fileName = '';
        })
      },
        onSubmit() {
          this.$refs['uploadForm'].validate((valid) => {
            if (valid) {
              let datas = this.uploadForm;
              datas.userid = localStorage.getItem('userid');
              datas.coverimg = this.detailRuleForm.coverImg;
              uploadForm(datas).then((res) => {
                if(res.status == '200000'){
                  this.$message({
                    message:res.msg,
                    type:'success'
                  })
                  this.$refs['uploadForm'].resetFields();
                }
              }).catch((err) => {
                console.log('上传 err')
              }) 
              
            } else {
              console.log('error submit!!');
              return false;
            }
        });
        },
      resetForm() {
        this.$refs['uploadForm'].resetFields();
      },
      toggleShow() {
          this.show = !this.show;
        },
        cropSuccess(coverImg,field) {
          this.detailRuleForm.coverImg = coverImg;

          // upImg({'img':coverImg}).then(res => {//上传 图片

          // }).catch(err => {

          // })
        },
        
    }
}
</script>
<style lang="scss" scoped>

.upload-container{
  background-color: #FFF;
  padding: 40px;
  border: 1px solid #E9EEF3;
  position: absolute;
  top: 70px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  // margin: 30px 30px 0;
    .upload-left{
        // padding:60px 0 0 100px;
        // margin-right: 40px;
    }
    .upload-right{
        // padding-top: 60px;
        padding-left:30px;
    }
    .cover-image{
      position: relative;
      width: 370px;
      height: 150px;
      .coverImg{
        
        position: absolute;
        top: 0;
        right: 0;
        width: 120px;
        height: 150px;
        
        box-sizing: border-box;
        padding:4px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        overflow: hidden;
        div{
          position: absolute;
          color: #d9d9d9;
          top:60px;
          left:43px;
        }
       
      }
    }
}
</style>


