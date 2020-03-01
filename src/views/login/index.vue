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
      <el-form style="margin-top:20px">

        <el-form-item>
          <!-- 表单域 -->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item class="login-button">
          <el-input class="login-button-right" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button class="login-button-left"  placeholder="发送验证码"></el-button>
        </el-form-item>

        <!-- 表单域 -->
        <el-form-item>
          <!-- 复选框 -->
          <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
