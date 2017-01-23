<template>
  <div>
		Loading...
  </div>
</template>

<script>
export default {
  mounted () {
		if (!this.$store.getters.isLogin) {
      this.$store.dispatch('GOOGLELOGIN')
    } else {
      this.$router.push('/aboutme')
    }
	}
}
</script>

<style scoped>

</style>
