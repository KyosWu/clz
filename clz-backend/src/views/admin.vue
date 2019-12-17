<template>
  <div>
    <nav-header></nav-header>
    <el-row type="flex" justify="space-between" style="min-width:1200px;">
      <el-col :span="3">
        <nav-left class="navleft"></nav-left>
      </el-col>
      <el-col :span="21" class="routerView">
        <!--路由动态标签-->
        <tags-View></tags-View>
        <router-view style="padding-top:15px"></router-view>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import NavHeader from '@/components/admin/NavHeader'
import NavLeft from '@/components/admin/NavLeft'
import tagsView from '@/components/common/tagsView/Index'
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    NavHeader,
    NavLeft,
    tagsView
  }
}
</script>
<style lang="less">
    @import '../assets/css/admin/style.less';
    body {
        min-width:1200px;
    }
</style>
