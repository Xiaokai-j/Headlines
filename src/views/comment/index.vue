<template>
<!-- 使用 el-card 组件做主页面 -->
  <el-card>
      <!-- 放置一个面包屑 -->
      <!-- slot="header" 表示面包屑会作为具名插槽给card -->
      <bread-crumb slot="header">
      <!-- slot="title" 表示评论管理给面包屑的插槽 -->
        <template slot="title">
         评论管理
        </template>
      </bread-crumb>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
