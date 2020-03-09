<template>
  <!-- 二级路由的默认组件 -->
<div class="homes">
    <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card"  height="150px">
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
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583644201826&di=1cadbcf5a5120af5abf37e7bd7347d55&imgtype=0&src=http%3A%2F%2Fimg.hifangjia.com%3A8999%2Fimages%2Fori%2Fgroup1%2FM00%2F0B%2FE5%2FeBif6FdF0beAbUOqAAFW5CstP_4107.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583644275271&di=628316956915823242f7530acb8d0eb9&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1710%2F13%2Fc29%2F62949440_1507892545332.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583644310623&di=ff19a4af764a01496c1005ce07d576a4&imgtype=0&src=http%3A%2F%2Fimg2.cache.netease.com%2Fhouse%2F2015%2F7%2F21%2F20150721140545ddb8d.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583644334301&di=2d017661e85d999dc18212bd58492cc7&imgtype=0&src=http%3A%2F%2Fwww.toptour.cn%2FPortals%2F0%2FRemoteUpload%2Fu6986p704dt20130708163747.jpg']
    }
  }
}
</script>

<style>
.homes {
  /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("http://img3.selfimg.com.cn/prnnews/2018/11/20/c388c3f60e75638e965e392f6693d714.png");
}
</style>
