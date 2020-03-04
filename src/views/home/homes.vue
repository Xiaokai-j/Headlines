<template>
  <!-- 二级路由的默认组件 -->
<div class="homes">
    <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583260357974&di=4299d4bac010c2987a9f52b336cdeb6c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180701%2Fe01d5a4f8d84493ea06128ee252330c8.jpeg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=34326127,1205172617&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=229097873,1949857024&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583260357968&di=370746c6cdd657a1683e426b2bcf8cf7&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft0152cd6fcbbe39568f.jpg']
    }
  }
}
</script>

<style>
.homes {
  /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583260357968&di=370746c6cdd657a1683e426b2bcf8cf7&imgtype=0&src=http%3A%2F%2Fp2.qhimgs4.com%2Ft0152cd6fcbbe39568f.jpg");
}
</style>
