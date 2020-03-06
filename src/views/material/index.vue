<template>
<!-- 素材管理 -->
<!-- el-card 布局 -->
<el-card>
<!-- 放置面包屑 -->
    <bread-crumb slot="header">
<!-- 具名插槽 -->
        <template slot="title">
            素材管理
        </template>
    </bread-crumb>
    <!-- 放置标签页 -->
    <el-tabs v-model="activeName">
        <!-- 放置标签 -->
        <!-- lable表示标签显示的名称 -->
        <!-- name 代表页签选中的值 -->
        <el-tabs-pane label="全部素材" name="all">
            <!-- 内容 -->
            全部素材
        </el-tabs-pane>
        <el-tabs-pane label="收藏素材" name="collect">
            <!-- 内容 -->
            收藏素材
        </el-tabs-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// 默认选中全部素材
    }
  }
}
</script>

<style>

</style>
