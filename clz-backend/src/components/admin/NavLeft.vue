<template>
  <Menu active-name="admin" :open-names="['1','4']" @on-select="getIndex" style="width:100%;min-height:100vh;">
    <Submenu name="1">
      <template slot="title">
        <div class="row">
          <img class="svg" src="../../assets/images/svg/navLeft/系统.svg" alt="">
          <div>系统概览</div>
        </div>
      </template>
      <MenuItem name="system">
        <div class="row">
          <img class="svg" src="../../assets/images/svg/navLeft/控制面板-01.svg" alt="">
          <div>控制面板</div>
        </div>
      </MenuItem>
    </Submenu>

  <Submenu name="2">
    <template slot="title">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/版本管理设置_操作_jurassic.svg" alt="">
        <div>版本控制</div>
      </div>
    </template>
    <MenuItem name="version">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/版本发布.svg" alt="">
        <div>发布版本</div>
      </div>
    </MenuItem>
  </Submenu>

  <Submenu name="3">
    <template slot="title">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/权限控制.svg" alt="">
        <div>权限管理</div>
      </div>
    </template>
    <MenuItem name="adminList">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/管理员.svg" alt="">
        <div>管理员列表</div>
      </div>
    </MenuItem>
    <MenuItem name="adminAdd">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/添加管理员.svg" alt="">
        <div>添加管理员</div>
      </div>
    </MenuItem>
  </Submenu>

  <Submenu name="4">
    <template slot="title">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/文章管理.svg" alt="">
        <div>文章管理</div>
      </div>
    </template>
    <MenuItem name="article">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/发布文章.svg" alt="">
        <div>发布文章</div>
      </div>
    </MenuItem>
    <MenuItem name="articleList">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/文章.svg" alt="">
        <div>文章列表</div>
      </div>
    </MenuItem>
  </Submenu>

  <Submenu name="5">
    <template slot="title">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/评论管理.svg" alt="">
        <div>评论管理</div>
      </div>
    </template>
    <MenuItem name="comment">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/评论列表.svg" alt="">
        <div>评论列表</div>
      </div>
    </MenuItem>
  </Submenu>

  <Submenu name="6">
    <template slot="title">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/标签管理.svg" alt="">
        <div>标签管理</div>
      </div>
    </template>
    <MenuItem name="tag">
      <div class="row">
        <img class="svg" src="../../assets/images/svg/navLeft/标签列表.svg" alt="">
        <div>标签列表</div>
      </div>
    </MenuItem>
  </Submenu>

</Menu>
</template>

<script>
export default {
  methods: {
    getIndex (val) {
      this.$router.push({name: val})
    }
  }
}
</script>

<style lang="less">
  .ivu-menu-item {
    font-weight: bold !important;
    i {
      font-weight: bold;
    }
  }
  .iconfont {
    font-weight: bold;
  }
</style>

<style scoped>
  .row {
    display: flex;
    align-items: center;
  }
  .svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  //系统
  .kzmb {
  background-image: url("../../assets/images/svg/navLeft/控制面板-01.svg");
  }
// 版本发布
  .fbbb {
  background-image: url("../../assets/images/svg/navLeft/版本发布.svg");
  }
  // 管理员
  .glylb {
  background-image: url("../../assets/images/svg/navLeft/管理员.svg");
  }
  .tjgly {
  background-image: url("../../assets/images/svg/navLeft/添加管理员.svg");
  }
  // 文章
  .fbwz {
  background-image: url("../../assets/images/svg/navLeft/发布文章.svg");
  }
  .wzlb {
  background-image: url("../../assets/images/svg/navLeft/文章管理.svg");
  }
  // 评论管理
  .pllb {
  background-image: url("../../assets/images/svg/navLeft/评论列表.svg");
  }
  // 标签管理
  .bqlb {
  background-image: url("../../assets/images/svg/navLeft/标签列表.svg");
  }
</style>
