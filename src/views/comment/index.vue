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
          <el-table-column width="400"  label="标题"></el-table-column>
          <el-table-column label="评论状态"></el-table-column>
          <el-table-column label="总评论数"></el-table-column>
          <el-table-column label="粉丝评论数"></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { id: 1, name: '北京', date: '2020年3月5号18:00:00' },
        { id: 2, name: '天津', date: '2020年3月5号18:00:00' },
        { id: 3, name: '唐山', date: '2020年3月5号18:00:00' }
      ]
    }
  }
}
</script>

<style>

</style>
