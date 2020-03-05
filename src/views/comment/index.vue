<template>
<!-- 使用 el-card 组件做主页面 -->
  <el-card>
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
            <el-button size="small" type="text">修改</el-button>
            <el-button size="small" type="text">关闭评论</el-button>
          </el-table-column>
      </el-table>
      <!-- el-table 不显示布尔值 el-table提供了列的格式化工具 可以将布尔值转化成显示其他的值，比如打开/关闭-->
      <!-- el-table-column 提供了一个属性叫  formatter  用来格式化内容的 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
        // { id: 1, name: '北京', date: '2020年3月5号18:00:00' },
        // { id: 2, name: '天津', date: '2020年3月5号18:00:00' },
        // { id: 3, name: '唐山', date: '2020年3月5号18:00:00' }
      ]
    }
  },
  methods: {
    // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          // 返回数据的字段，不传返回用于内容管理的字段，传comment 返回用于评论管理的字段 传statistic返回用于图文数据的字段
          response_type: 'comment' // 此参数用来控制获取的数据类型
        }
        // query 参数应该在 axios 位置传
        // params 传get 参数 也就是query参数
        // data   传body参数 也就是请求体参数
      }).then(result => { // 获取结果
        // console.log(result)
        // 将返回结果中的 数组 给list
        this.list = result.data.results
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
