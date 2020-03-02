<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- logo部分 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <!-- <el-form> 表单容器 -->
        <!-- 绑定:model="loginForm"属性 -->
      <!-- data定义rules属性  表示约定的验证规则 -->
      <!--ref="loginForm" 给 el-form 一个属性  -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">

        <!-- 表单容器 设置prpo属性 表示要验证的字段-->
        <el-form-item prop="mobile">
          <!-- 表单域  双向绑定 v-model 绑定表单数据对象-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code"  class="login-button">
          <el-input class="login-button-right" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button class="login-button-left"  placeholder="">发送验证码</el-button>
        </el-form-item>

        <!-- 表单域 -->
        <el-form-item prop="checked"  >
          <!-- 复选框 -->
          <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false// 用户是否同意协议
      },
      // 定义表单的验证规则
      loginRules: {
        // 手机号的验证规则
        mobile: [
          {
            required: true,
            message: '您的手机号不能为空'
          },
          // pattern正则表达式
          // /^1[3-9]\d{9}$/  以1为开头，3-9为第二位数字
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '您的手机号格式不正确'
          }
        ],
        // 验证码的验证规则
        code: [
          {
            required: true,
            message: '您输入的验证码不正确'
          },
          {
            pattern: /^\d{6}$/, // 要求6位数字
            message: '验证码不正确'
          }
        ],
        // 是否勾选的规则
        checked: [
          // 自定义校验  required 不能校验true/fasle
          {
            validator: function (rule, value, callback) {
              // rule 是当前的校验规则
              // value 是当前的要校验的字段的值
              // callback 是一个回调函数 不论成功还是失败都要执行
              // 成功执行callback 失败执行callback（new Error('错误信息')）
              value ? callback() : callback(new Error('您须勾选才能登陆'))
            }
          }
        ]
      }
    }
  },
  methods: {
    // 给按钮注册一个事件，绑定一个方法
    // ref可以获取 原生dom对象，还可以获取组件对象实例
    login () {
      //    this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOK, fields(没有校验通过的字段)

      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法

      // 第二种方式 promise
      this.$refs.loginForm.validate().then(() => {
      // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事情？==》调用登录接口 看看手机号是否正确
        this.$axios({
          url: '/authorizations', // 请求地址
          // params: 'this.loginForm', // 指的是url参数 多数会拼接到url地址上面  常说的get参数
          // data: {
          //   ...this.loginForm,
          //   checked: null
          // }, // body请求体参数 常用于get、post
          data: this.loginForm,
          method: 'post'
        }).then(result => {
          // 成功
          // 把钥匙放在兜里面，用的时候再拿
          window.localStorage.setItem('user-token', result.data.data.token)
          // console.log(result.data.data.token)
          // 跳转到主页
          // push 和 router-link 类似 to属性 可以直接是字符串也可以是对象
          this.$router.push('/home')
        }).catch(() => {
          // 提示消息
          this.$message({ message: '用户名或密码错误' })
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
//如果使用less 需要在style标签上写 lang='less'
//加上scoped 只对当前（自己的）的heml起作用
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh; //当屏幕可视区域分为100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
    .login-button{
      .login-button-right{
        width:60%;
      }
      .login-button-left{
        float:right;
        width: 35%;
        height: 40px;
      }
    }
  }
}
</style>
