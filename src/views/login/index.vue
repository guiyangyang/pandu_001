<template>
  <div class="login-container">
    <div>
      <el-button type="primary" @click='ceshi'>测试请求</el-button>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title">盘&nbsp;&nbsp;&nbsp;&nbsp;度 </div>
      <div class="title-tip">共享美好时光</div>
      <el-form-item prop="userphone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.userphone" name="userphone" type="text" auto-complete="on" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item class="form-btns">
        <el-button :loading="loadingR" type="primary" style="width:46%;" @click.native.prevent="handleRegister">
          注册
        </el-button>
        <el-button :loading="loading" type="primary" style="width:46%;" @click.native.prevent="handleLogin" class="btn-login">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">userphone: 15510370703</span>
        <span> password: 1234</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { isvaliduserphone } from '@/utils/validate'
// import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    const validateuserphone = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能小于4位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userphone: '',
        password: ''
      },
      loginRules: {
        userphone: [{ required: true, trigger: 'blur', validator: validateuserphone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      loadingR:false,
      pwdType: 'text',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log('handler');
        console.log(route.query)
        console.log(route.query.redirect)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ceshi() {
      console.log('ceshi');
      this.$store.dispatch('CeShi').then((res) => {
         console.log('ceshi  success')
         console.log(res)
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$router.push({ path: this.redirect || '/' })
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            if(res.status == '200000'){
              console.log(res.msg)
              console.log(res)
              localStorage.setItem('userid',res.result.userid)
              localStorage.setItem('userphone',res.result.userphone)
              // Cookies.set(TokenKey, token)
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
            }
            
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      console.log('注册')
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.loadingR = true
          this.$store.dispatch('Register',this.loginForm).then((res) => {
            console.log('index-vue')
            console.log(res)
            
            this.loadingR = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loadingR = false
          })
        }else{
          console.log('验证错误')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .form-btns{
    border:none;
    background: none;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 30px;
    font-weight: 400;
    color: $light_gray;
    text-align: center;
    font-weight: bold;
  }
  .title-tip{
    text-align: center;
    margin: 10px 0 16px;
    color: #1188cf;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .btn-login{
    float: right;
  }
}
</style>
