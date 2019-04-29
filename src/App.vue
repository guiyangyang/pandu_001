<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app .sidebar-container{
  width: 180px !important;
}
.el-submenu__title{
  height: 46px;
  line-height: 46px;
}
.el-submenu .el-menu-item{
  height: 40px;
  line-height: 40px;
}
</style>

