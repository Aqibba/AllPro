<template>
  <el-container class="layout-default">
    <el-header>
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/Index.vue'
import MyFooter from '@/components/public/footer/Index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
.el-header {
  height: 197px !important;
}
.el-footer {
  height: 100% !important;
}
</style>
