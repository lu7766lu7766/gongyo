<template>
  <div class="container">
    系統需要使用google帳號登入<br>
    <button class="btn btn-info" @click="google_login">登入Google</button>
  </div>
</template>

<script>
export default {
  methods: {
    google_login () {
      this.$store.dispatch('GOOGLELOGIN')
    }
  },
  mounted () {
		if (this.$store.getters.isLogin) {
      this.$router.push('/aboutme')
    }
	}
}
</script>

<style scoped>
  .container {
    padding: 50px 0 0 0;
  }
</style>
