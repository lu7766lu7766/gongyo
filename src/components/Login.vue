<template>
  <div class="body">
    <div class="container-fluid">
      <div class="row">
        <div class="login-box col-xs-12 col-md-offset-4 col-md-4">
            <div class="login-logo">
                <h2 class="form-signin-heading">選擇登入方式</h2>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <img class="loginBtn" src="../assets/images/googleLoginBtn.png" @click="google_login" alt="登入Google" title="登入Google"/>
                    <!--<button @click="full">full</button>-->

                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  methods: {
    google_login () {
      // this.$store.dispatch('GOOGLELOGIN_HELLO')
      this.$store.dispatch('GOOGLELOGIN_FIREBASE')
    },
    full () {
      var el = document.body,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen


      rfs.call(el);
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
  .body {
    height:100vh;
    width:100%;
    background-color: rgb(193, 230, 198);
  }
  .loginBtn {
    max-width: 50px;
  }
  .login-box {
    padding: 20px;
    background-color: #f3f3f3;
  }
</style>
