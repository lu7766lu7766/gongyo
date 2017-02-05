import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config/default'
import Firebase from 'firebase'
import storage from 'store'
import router from './router'
import _ from 'lodash'

let hello = require('../node_modules/hellojs/dist/hello.all.min.js')

var dbConf = config.Firebase.config
var defaultInfo = config.Firebase.defaultInfo
var firebaseApp = Firebase.initializeApp(dbConf)
var db = firebaseApp.database()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    browser: '',
    db: db,
    id: storage.get('id') || '',
    login_msg: storage.get('login_msg') || {},
    user: storage.get('user') || {},
    bak_user: storage.get('user') || {},
    ring: storage.get('ring') || {},
    area: storage.get('area') || {},
    league: storage.get('league') || {}
  },
  mutations: {
    log_login_msg (state, data) {
      state.id = data.user.email.split('@')[0]
      state.login_msg = data
    },
    log_user (state, data) {
      state.user = data
    },
    log_league (state, data) {
      state.league = data
    },
    log_ring (state, data) {
      state.ring = data
    },
    log_area (state, data) {
      state.area = data
    },
    logout (state) {
      state.id = ''
      state.login_msg = {}
      state.user = {}
      state.ring = {}
      state.area = {}
      state.league = {}
      state.bak_user = {}
    }
  },
  actions: {
    GOOGLELOGIN_FIREBASE ({commit, state, dispatch}) {
      var provider = new Firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      Firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        var loginMsg = {token, user}

        storage.set('login_msg', loginMsg)
        commit('log_login_msg', loginMsg)


        router.push('/aboutme')
      }).catch(function (error) {
        console.log('errorCode:' + error.code)
      })
    },
    GOOGLELOGIN_HELLO ({commit, state, dispatch}) {

      hello.init({
        google: "166048627038-sl2t9absnr0g5shfard0ovf52naqghmj.apps.googleusercontent.com"
      }, {
        // redirect_uri: 'http://localhost:8080/',
        // response_type: 'code',
        scope : 'publish, friends, photos, email'
      });

      hello('google').login().then(function () {
        // alert('You are signed in to google');
        const token = hello('google').getAuthResponse().access_token

        hello('google').api('me').then(function (user) {
          console.log(user)
          var loginMsg = {token, user}
          storage.set('login_msg', loginMsg)
          commit('log_login_msg', loginMsg)
          router.push('/aboutme')
        }, function(e) {
          console.log(e.error.message)
        });

        console.log(token)
      }, function(e) {
          alert('Signin error: ' + e.error.message);
      })
    },
    GOOGLELOGOUT_FIREBASE ({dispatch, commit}) {
      // var user = Firebase.auth().currentUser;

      Firebase.auth().signOut().then(function() {
        // Sign-out successful.
        storage.clear()
        commit('logout')
        //dispatch('GOOGLELOGIN')
        router.push('/')
      }, function(error) {
        // An error happened.
      })
    },
    GOOGLELOGOUT_HELLO ({dispatch, commit}) {
      hello('google').logout().then(function() {
        storage.clear()
        commit('logout')
        router.push('/')
      }, function(e) {
        // alert('Signed out error: ' + e.error.message);
        console.log(e.error.message)
      });

    },
    GET_USER ({commit, state}) {
      db.ref('user/' + state.id).on('value', function (ref) {
        var val = ref.val()
        if (!val) {
          val = defaultInfo

          const isFirebase = !!state.login_msg.user.photoURL
          if (isFirebase) {
            val.name = state.login_msg.user.displayName
            val.photoURL = state.login_msg.user.photoURL
          } else {
            val.name = state.login_msg.user.name
            val.photoURL = state.login_msg.user.picture.split('sz=')[0] + 'sz=450'
          }

          var updates = {}
          updates[state.id] = val
          db.ref('user').update(updates)
        }

        storage.set('id', state.id)
        storage.set('user', val)
        commit('log_user', val)

        // if (!state.bak_user)
        state.bak_user = _.cloneDeep(state.user)
      })
    },
    GET_LEAGUE ({commit}) {
      db.ref('league').on('value', function (ref) {
        storage.set('league', ref.val())
        commit('log_league', ref.val())
      })
    },
    GET_RING ({commit}) {
      db.ref('ring').on('value', function (ref) {
        storage.set('ring', ref.val())
        commit('log_ring', ref.val())
      })
    },
    GET_AREA ({commit}) {
      db.ref('area').on('value', function (ref) {
        storage.set('area', ref.val())
        commit('log_area', ref.val())
      })
    },
    UPDATE_USER ({state}) {
      var updates = {}
      updates['user/' + state.id] = state.user
      var a_update = [db.ref().update(updates)]
      if (state.user.area != state.bak_user.area || state.user.ring != state.bak_user.ring)
      {
        a_update.push(db.ref('member/'+ state.bak_user.ring + '/' + state.bak_user.area + '/' + state.id).remove())
        var members = {}
        members['member/' + state.user.ring + '/' + state.user.area + '/' + state.id] = 1
        a_update.push(db.ref().update(members))
      }
      Promise.all(a_update).then(() => {
        alert('修改完成')
        storage.set('user', state.user)
        state.bak_user = _.cloneDeep(state.user)
      })
    },
    UPDATE_CHANTING ({state}, payload) {
      var updates = {}
      updates['chanting/' + state.id + '/' + new Date().Format('Y-m-d')] = payload.mins
      db.ref().update(updates).then(() => {
        alert('恭喜完成今日題目數!!')
      })
    }
  },
  getters: {
    isLogin: state => {
      // var user = Firebase.auth().currentUser
      return !!state.login_msg.user //
    },
    canUse: state => {
      return state.user.ring && state.user.area
    }
  }
})
