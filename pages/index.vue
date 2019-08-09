<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic />
    </el-row>
  </div>
</template>

<script>
import Emenu from '../components/index/Menu.vue'
import Life from '../components/index/Life.vue'
import Artistic from '../components/index/Artistic.vue'

export default {
  components: {
    Emenu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/index.scss';
</style>
