<!-- 搜索 -->
<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="../../../assets/img/logo.png" alt="美团"></img>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <!-- 搜索框的得到/失去焦点事件 输入事件 -->
          <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input" />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <!-- 在搜索框中获取到焦点显示的列表 -->
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) of hotPlace" :key="index">
              {{ item }}
            </dd>
          </dl>
          <!-- 在搜索框获取焦点并且有值输入的时候显示的列表 -->
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, index) of searchList" :key="index">
              {{ item }}
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <!-- <ul class="security">
          <li>
            <i class="refund"><p class="txt">随时退</p></i>
          </li>
          <li>
            <i class="single"><p class="txt">不满意免单</p></i>
          </li>
          <li>
            <i class="overdue"><p class="txt">过期退</p></i>
          </li>
        </ul> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 判断搜索框是否是获得焦点的
      isFocus: false,
      // 判断搜索框中是否有输入的值
      search: '',
      hotPlace: ['故宫博物院', '天安门', '南锣鼓巷', '王府井'],
      searchList: ['火锅', '烤鱼', '黄焖鸡', '串串', '烧烤']
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    // 搜索框的的到焦点和失去焦点的事件
    focus () {
      this.isFocus = true
    },
    blur () {
      this.isFocus = false
      // 在有些浏览器中，点击链接的时候会先触发搜索框失去焦点事件，通过延迟触发搜索框失去焦点事件来控制点击链接
      // setTimeout(function(){
      //   this.isFocus = false
      // }, 3000)
    },
    input () {
      console.log(111)
    }
  }
}
</script>

<style></style>
