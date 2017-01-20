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
              <li><router-link to="/">回報題目數</router-link></li>
              <li><router-link to="/friends">好友</router-link></li>
              <li><router-link to="/aboutme">關於我</router-link></li>
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
            <strong>Copyright©2017 All Design By Jac Wang</strong>
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
import { mapState } from 'vuex'
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
    }
  },
  computed: mapState({
    user: 'user',
    login_msg: 'login_msg',
    ring: 'ring',
    area: 'area',
    league: 'league'
  })
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
