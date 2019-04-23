<template>
    <div class="upload-container">
        <el-row>
            <el-col :span="10" class="upload-left">
              <el-form :model="uploadForm" :rules="rules" ref="uploadForm" label-width="100px" label-position="right" size="mini" autocomplete='on'>
                  <el-form-item label="标题：" prop="title">
                      <el-input v-model="uploadForm.title" class="ipt-width"></el-input>
                  </el-form-item>
                  <el-form-item label="简介：" prop="introduce">
                      <el-input type="textarea"
                      :autosize="{ minRows: 1, maxRows: 6}"
                       v-model="uploadForm.introduce" class="ipt-width"></el-input>
                  </el-form-item>
                  <el-form-item label="选择分类：" prop="type">
                      <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        change-on-select
                        filterable
                        v-model="selectedOptions"
                      ></el-cascader>
                  </el-form-item>
                  <el-form-item label="网盘类别：" prop="linktype">
                        <el-select v-model="checklinktype" clearable placeholder="请选择">
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
                        :autosize="{ minRows: 1, maxRows: 2}"
                        v-model="uploadForm.link" class="ipt-width"></el-input>
                  </el-form-item>
                  <el-form-item label="分享密码：" prop="password">
                       <el-radio v-model="uploadForm.pwdRadio" label="1">无</el-radio>
                       <el-radio v-model="uploadForm.pwdRadio" label="2">有</el-radio>
                       <el-input v-model="uploadForm.password" style="width:20%;"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期限：" prop="effecttime">
                       <el-radio-group v-model="uploadForm.effecttime">
                            <el-radio :label="0">永久</el-radio>
                            <el-radio :label="7">7天</el-radio>
                            <el-radio :label="1">1天</el-radio>
                        </el-radio-group>
                  </el-form-item>
                   <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small">立即上传</el-button>
                        <el-button size="small">取消重置</el-button>
                    </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="14" class="upload-right">
                <el-form :model="uploadForm" :rules="rules" label-width="100px" label-position="right" size="mini" autocomplete='on'>
                    <el-form-item label="封面图：" prop="img">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="uploadForm.img" :src="uploadForm.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
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
export default {
    data() {
        return {
          uploadForm:{
            title:'',
            introduce:'',
            link:'http://www.baidu.com',
            password:'',
            pwdRadio:'',
            effecttime:0,
            img:''
          },
          rules:{

          },
          options: [{
          value: 'books',
          label: '书籍库',
          children: [{
            value: 'literature',
            label: '文学类'
          }, {
            value: 'technology',
            label: '科技类'
          }]
        },{
          value: 'videos',
          label: '视频库',
          children: [{
            value: 'movies',
            label: '电影'
          }, {
            value: 'teleplay',
            label: '电视剧'
          }]
        }],
        selectedOptions: ['books', 'literature'],
        checklinktype:null,
        linkTypeLists:[
            {
                label:'百度网盘',
                value:'bd'
            },
            {
                label:'亿方云盘',
                value:'yf'
            },
            {
                label:'腾讯网盘',
                value:'tx'
            }
        ]
        }
    },
    methods:{
        onSubmit() {
            console.log('onSubmit')
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
            console.log(file)
        this.uploadForm.img = URL.createObjectURL(file.raw);
        console.log(this.uploadForm.img)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
            this.$message.error('上传头像图片只能是 JPG PNG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>
<style lang="scss" scoped>

.upload-container{
    .upload-left{
        padding:60px 0 0 60px;
    }
    .upload-right{
        padding-top: 60px;
    }
    .ipt-width{
        // width: 50%;
    }
    .avatar-uploader{
        width: 156px;
        height: 162px;
        border: 1px dashed #d9d9d9;
    }

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 138px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 160px;
    display: block;
  }
}
</style>


