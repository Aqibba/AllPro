<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item v-for="item in list" :key="item.img">
        <img :src="item.img"></img>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      list: [{
        url: '#abc',
        img: require('../../assets/img/rolling1.jpg')
      }, {
        url: '#bsbsb',
        img: require('../../assets/img/rolling2.png')
      }, {
        url: '#sjfkajfj',
        img: require('../../assets/img/rolling3.jpg')
      }, {
        url: '#sjfkajfja',
        img: require('../../assets/img/rolling4.jpg')
      }, {
        url: '#kjljj',
        img: require('../../assets/img/rolling5.jpg')
      }]
    }
  }
}
</script>
