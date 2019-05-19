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
  background-color: #f9f8fc;
 .navbar{
    position: fixed;
    left:180px;
    right: 0;
    background: #fff;
    z-index: 200;
    
  }
}
</style>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh);
  position: relative;
  overflow: hidden;
  padding-top: 50px;
  /* margin-top: 50px; */
  background-color: #f9f8fc;
  box-sizing: border-box;
  color: #303133;
}
</style>
