<template>
  <div id="app">
    <nav id="header" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" id="menu-toggle" style="cursor:pointer" @click="toggleMenu">GONGYO</a>
            </div>
        </div>
    </nav>
    <div id="wrapper" style="margin-top:50px" @click="closeMenu">
        <div id="sidebar-wrapper">
            <ul class="mainmenu sidebar-nav">
              <li><router-link to="/feedback">回報題目數</router-link></li>
              <li><router-link to="/getchanting">查題目數</router-link></li>
              <li><router-link to="/aboutme">關於我</router-link></li>

              <li><router-link to="/friends">好友</router-link></li>
              <li><a v-if="!isLogin" @click="login">登入</a></li>
              <li><a v-if="isLogin" @click="logout">登出</a></li>
              <li><a v-if="id=='lu7766lu7766'" @click="showLog">Show Log</a></li>
            </ul>
        </div>
        <div id="page-content-wrapper" style="min-height: 246.909px;">
            <div id="main-content" class="container-fluid" style="min-height: 182px; padding-bottom: 15px;">
                <router-view transition="slide"></router-view>
            </div><!--main-content-->
        </div><!--page-content-wrapper-->
    </div>
    <div id="footer">
        <footer class="main-footer text-center panel-footer" >
            <strong>Copyright©{{new Date().getFullYear()}} All Design By Jac Wang</strong>
        </footer>
    </div>
    <!--{{login_msg|json}}<br>
    {{user|json}}<br>
    {{ring|json}}<br>
    {{area|json}}<br>
    {{league|json}}<br>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    toggleMenu () {
      $('#wrapper').toggleClass('toggled')
    },
    closeMenu () {
      $('#wrapper').removeClass('toggled')
    },
    login () {
      // this.$store.dispatch('GOOGLELOGIN')
      this.$router.push('/')
    },
    logout () {
      this.$store.dispatch('GOOGLELOGOUT_FIREBASE')
      // this.$store.dispatch('GOOGLELOGOUT_HELLO')
    },
    showLog () {
      console.log('id: ' + this.id)
      console.log('user: ' + JSON.stringify(this.user))
      console.log('bak_user: ' + JSON.stringify(this.bak_user))
      console.log('ring: ' + JSON.stringify(this.ring))
      console.log('area: ' + JSON.stringify(this.area))
      console.log('league: ' + JSON.stringify(this.league))
      console.log('login_msg: ' + JSON.stringify(this.login_msg))
    }
  },
  computed: {
    ...mapState([
      'user',
      'login_msg',
      'ring',
      'area',
      'league',
      'id',
      'bak_user'
    ]),
    ...mapGetters([
      'isLogin'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 0px;
}

#sidebar-wrapper {
  text-align: left;
  padding-bottom: 41px
}

#footer {
  position:fixed;
  bottom: 0;
  width: 100%;
  border-top-color: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease padding 0.3s ease;
}
</style>
