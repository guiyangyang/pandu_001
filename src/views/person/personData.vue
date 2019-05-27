<template>
    <div class="persondata-container">
        <el-form ref="form" :model="form" :rules="formRules" label-position="right" label-width="100px">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="form.username" :disabled="nameAble" size="small"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model="form.userphone" :disabled="true" size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="form.email" :disabled="emailAble" size="small"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="password">
                <el-input v-model="form.password" size="small"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirmpwd">
                <el-input v-model="form.confirmpwd" size="small"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:0px;">
            <el-button type="primary" :disabled="submitAble" @click="onSubmit" size="small">确认修改</el-button>
            </el-form-item>
        </el-form>
        

    </div>
</template>
<script>
import { modify } from "@/api/login"
export default {
    data() {
        let validatName = (rule,value,callback) => {
            let val = value.trim();
            if(val.length && (val.length < 3 || val.length >20 )){
                callback(new Error('长度在3至20个字符之间'));
            }else{
                callback();
            }
        }
        let validatEmail = (rule,value,callback) => {
            let val = value.trim();
            let reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
            if(val.length && !(reg.test(val) )){
                callback(new Error('邮箱地址有误'));
            }else{
                callback();
            }
        }
        let validatPwd = (rule,value,callback) => {
            let val = value.trim();
            let reg = /^[0-9a-zA-Z]{6,12}$/;
            if(val.length && !(reg.test(val) )){
                callback(new Error('请输入6至12位字母数字组合密码'));
            }else{
                callback();
            }
        }
        let validatCpwd = (rule,value,callback) => {
            let val = value.trim();
            let reg = /^[0-9a-zA-Z]{6,12}$/;
            if(val.length && !(reg.test(val) )){
                callback(new Error('请输入6至12位字母数字组合密码'));
            }else{
                callback();
            }
        }
        return {
            nameAble:false,
            emailAble:false,
            form:{
                username:'',
                userphone:'',
                email:'',
                password:'',
                confirmpwd:''
            },
            formRules:{
                username:{validator:validatName,trigger:'blur'},
                email:{validator:validatEmail,trigger:'blur'},
                password:{validator:validatPwd,trigger:'blur'},
                confirmpwd:{validator:validatCpwd,trigger:'blur'},

            }
        }
    },
    mounted() {
      this.getData();
    },
    computed: {
      submitAble() {
          let password = this.form.password.trim();
          if(password.length >5 && password.length <13){
              return false;
          }else{
              return true;
          }
      }
    },
    methods:{
        getData() {
            let userid = localStorage.getItem('userid');
            let username = localStorage.getItem('username');
            let userphone = localStorage.getItem('userphone');
            let email = localStorage.getItem('email');
            if(!userid){

             return false;
            }else{
                this.form.userphone = userphone;
            }
            if(username){
                this.form.username = username;
                this.nameAble = true;
            }
            if(email){
                this.form.email = email;
                this.emailAble = true;
            }
        },
        onSubmit() {
          this.$refs['form'].validate(valid => {
              if(valid){
                if(this.form.password !== this.form.confirmpwd){
                    this.$message({
                        message:'新密码与确认密码不一致',
                        type:'error'
                    })
                    return false;
                }else{
                    modify(this.form).then(res => {
                    }).catch(err => {
                        console.log('err')
                    })
                }

              }else{
                  console.log('验证失败')
              }
          })

         
        }
 
    }
}
</script>
<style lang="scss" scoped>
.el-input{
    width: 200px;
}
.persondata-container{
    margin:20px;
    padding:30px;
    background-color: #fff;
    overflow: hidden;
}
</style>


