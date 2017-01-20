<template>
  <div id="app">
    {{login_msg|json}}<br>
    {{user|json}}
    <button @click="googleLogin">google login</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    googleLogin () {

    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    login_msg () {
      return this.$store.state.login_msg
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
