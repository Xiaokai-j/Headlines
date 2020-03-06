<template>
<!-- 素材管理 -->
<!-- el-card 布局 -->
<el-card>
<!-- 放置面包屑 -->
    <bread-crumb slot="header">
<!-- 具名插槽 template不生成任何实质标签-->
        <template slot="title">
            素材管理
        </template>
    </bread-crumb>

    <el-row type="flex" justify="end">
    <!-- 放置一个上传文件组件 -->
    <!-- 上传组件要求必须穿 action 属性 不传就会报错 可以给一个空字符串 -->
        <el-upload :http-request="uploadImg" action="">
            <!-- 传入一个内容，就会 传出上传文件筐 -->
            <button size="small" type="primary">上传素材</button>
        </el-upload>
    </el-row>
    <!--  -->
    <!-- 放置标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <!-- 放置标签 -->
        <!-- lable表示标签显示的名称 -->
        <!-- name 代表页签选中的值 -->
        <el-tab-pane label="全部素材" name='all'>            <!-- 内容   循环生成页面结构-->
            <div class="img-list">
                <!-- 采用v-for对；list数据进行循环生成 -->
                <el-card class='img-card' v-for="item in list" :key="item.id">
                    <!-- 放置图片  并且赋值图片效果-->
                    <img :src="item.url" alt="">
                        <!-- 操作栏 -->
                        <el-row class="operate" type="flex" align="middle" justify="space-around">
                           <i class='el-icon-star-on'></i>
                           <i class='el-icon-delete-solid'></i>
                        </el-row>
                </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="收藏素材" name='collect'>
            <!-- 内容 -->
            <div class='img-list'>
                    <!-- 采用v-for对list数据进行循环 -->
                    <el-card class='img-card' v-for="item in list" :key="item.id">
                        <!-- 放置图片 并且赋值 图片地址-->
                        <img :src="item.url" alt="">
                    </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 放置一个公共的分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination background
        layout="prev,pager,next"
        :current-page="page.currentPage"
        :total="page.total"
        :page-size="page.pageSize"
        @current-change="changePage"></el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部素材
      list: [], // 接收全部素材的数据
      page: {
        currentaPage: 1,
        total: 0,
        pageSize: 4 // 每页多少条
      }
    }
  },
  methods: {
    uploadImg (params) {
      // params.file 就是需要上传的图片文件
      // 接口参数类型要求是formData
      const data = new FormData() // 实例化一个FormData对象
      data.append('image', params.file) // 加入文件参数
      //   开始传送上传请求
      this.$axios({
        url: '/user/images', // 请求地址
        methods: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(() => {
        //   如果成功了 应该重新来取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.console.error('上传素材失败')
      })
    },
    // 该方法会在页码切换时执行
    changePage (newPage) {
      // newPage 是最新页码切换
      // 将最新的页码 设置给 page 下的当前页码
      this.page.currentPage = newPage// 赋值最新页码
      // 重新拉取数据
      this.getComment()// 获取评论
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          // 这个位置应该变活 根据当前页签变活
        //   activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
          collect: this.activeName === 'collect',
          page: this.currentPage, // 取页码变量中的值
          per_page: this.page.pageSize
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        this.list = result.data.results
        // 将总条数赋值给total变量
        this.page.total = result.data.total_count // 总数  全部/收藏 素材的总数
      })
    },

    //   切换页签
    changeTab () {
      this.page.currentaPage = 1// 将页码重置为第一页
      // 在切换事件中
      // 可以根据当前activeName 来决定是获取那个方面的数据
      this.getMaterial()// 直接调用获取素材的方法
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card{
        width: 220px;
        height: 240px;
        margin: 20px 40px;
        position: relative;
        img{
            width: 100%;
        }
        .operate{
            position: absolute;
            left: 0;
            bottom:0;
            width: 100%;
            background:#f4f5f6;
            height: 30px;
            i{
                font-size: 20px;
            }
        }
    }
}
</style>
