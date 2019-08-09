<!-- 用户登录 -->
<template>
  <div class="m-user">
    <div v-if="user">
      欢迎您,
      <span class="username">{{ user }}</span>
      [
      <nuxt-link to="/exit">
        退出
      </nuxt-link>
      ]
    </div>
    <div v-else>
      <nuxt-link to="/login" class="login">
        立即登录
      </nuxt-link>
      <nuxt-link to="/register" class="register">
        注册
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  }
}
</script>

<style></style>
