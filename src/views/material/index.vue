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
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部素材
      list: [] // 接收全部素材的数据
    }
  },
  methods: {
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          // 这个位置应该变活 根据当前页签变活
        //   activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
          collect: this.activeName === 'collect'
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        this.list = result.data.results
      })
    },

    //   切换页签
    changeTab () {
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
