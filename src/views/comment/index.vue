<template>
<!-- 使用 el-card 组件做主页面 -->
<!-- v-loading="变量"  遮罩层 -->
<!-- 指令不同于属性 属性加冒号是变量 指令不需要加冒号就是变量 -->
  <el-card v-loading="loading">
      <!-- 放置一个面包屑 -->
      <!-- slot="header" 表示面包屑会作为具名插槽给card  的 header部分-->
      <bread-crumb slot="header">
      <!-- slot="title" 表示评论管理给面包屑的插槽 -->
        <template slot="title">
         评论管理
        </template>
      </bread-crumb>
      <!-- 表格组件 -->
      <el-table :data="list">
          <!-- 使用el-table-column 作为列 -->
          <!-- prop 表示显示的字段 label 表示表头-->
          <el-table-column prop="title" width="400"  label="标题"></el-table-column>
           <!-- 给el-table-column 一个formatter属性 用来格式化内容 因为table中不显示布尔值-->
          <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column  label="操作">
            <!-- el-table-column组件 在插槽中传出了 row $index store column -->
            <!-- 插槽 -> 作用域插槽 ->子组件中的数据 通过插槽传出 slot-scope接收  row(行数据) $index(索引)  -->
             <!-- 可以放组件 -->
            <template slot-scope="obj">
              <el-button size="small" type='text'>修改</el-button>
              <!-- 文本内容要根据 当前行里面的评论状态决定显示还是隐藏 -->
              <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
            </template>
          </el-table-column>
      </el-table>
      <!-- el-table 不显示布尔值 el-table提供了列的格式化工具 可以将布尔值转化成显示其他的值，比如打开/关闭-->
      <!-- el-table-column 提供了一个属性叫  formatter  用来格式化内容的 -->

  <!-- 设置分页组件 -->
  <!-- layout="prev,pager,next"   前，中，后 -->
  <!-- :total="100" 页数 -->
  <!--
    分页组件需要动态的
    total 当前的总数
    currentPage 当前的页码
    page-size 每页有多少条
  -->
  <el-row style="height:80px" type="flex" align="middle" justify="center" >
    <el-pagination background layout="prev,pager,next"
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
      // 分页参数单独放置一个对象 让数据更清晰
      page: {
        total: 0, // 默认总数是0
        currentPage: 1, // 默认的页码是第一个页
        pageSize: 10
      },
      list: [
        // { id: 1, name: '北京', date: '2020年3月5号18:00:00' },
        // { id: 2, name: '天津', date: '2020年3月5号18:00:00' },
        // { id: 3, name: '唐山', date: '2020年3月5号18:00:00' }
      ],
      loading: false // 控制遮罩层
    }
  },
  methods: {
    // 页码改变事件
    // newPage 就是点击切换最新页码
    changePage (newPage) {
      // newPage 是最新页码切换
      // 将最新的页码 设置给 page 下的当前页码
      this.page.currentPage = newPage// 赋值最新页码
      // 重新拉取数据
      this.getComment()// 获取评论
    },
    // 获取评论数据
    getComment () {
      // 需求：在请求之前将loading 打开 请求数据完毕之后关闭
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/articles', // 请求地址
        // 接口如果不传分页数据默认查第一页的数据
        params: {
          // 返回数据的字段，不传返回用于内容管理的字段，传comment 返回用于评论管理的字段 传statistic返回用于图文数据的字段
          response_type: 'comment', // 此参数用来控制获取的数据类型
          page: this.page.currentPage, // 查对应页码
          per_page: this.page.pageSize
        }
        // query 参数应该在 axios 位置传
        // params 传get 参数 也就是query参数
        // data   传body参数 也就是请求体参数
      }).then(result => { // 获取结果
        // console.log(result)
        // 将返回结果中的 数组 给list
        this.list = result.data.results
        // 在获取完数据之后 赋值给 total
        this.page.total = result.data.total_count // 将总数赋值
        this.loading = false // 关闭遮罩层
      })
    },
    // el-table-column 提供了一个属性叫  formatter  用来格式化内容的
    // 定义一个格式化的函数  他有四个参数row, column, cellValue, index
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引

      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    //  打开或者关闭逻辑
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      // 消息提示
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用打开或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            article_id: row.id.toString() // 要求参数的文章id 将 BigNumber 类型转化成字符串
            // 前端传字符串到后端 只要和原来数字一致 后端会自动减字符串转成大数字
            // 只需要保证 id 和传过来的id一致就行
          },
          data: {
            //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
          //   表示失败了 会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    // 在钩子函数中直接获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
