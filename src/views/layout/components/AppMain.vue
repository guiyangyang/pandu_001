<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style lang="scss">
.main-container{
  margin-left: 180px !important;
 .navbar{
    position: fixed;
    left:180px;
    right: 0;
    background: #fff;
    z-index: 100;
    
  }
}
</style>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  padding-top: 50px;
  background-color: #f9f8fc;
  color: #303133;
}
</style>
