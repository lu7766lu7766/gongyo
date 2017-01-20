import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config/default'
import Firebase from 'firebase'
import store from 'store'

var dbConf = config.Firebase.config
var defaultInfo = config.Firebase.defaultInfo
var firebaseApp = Firebase.initializeApp(dbConf)
var db = firebaseApp.database()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_msg: store.get('login_msg') || {},
    user: store.get('user') || {},
    ring: store.get('ring') || {},
    area: store.get('area') || {},
    league: store.get('league') || {}
  },
  mutations: {
    log_login_msg (state, data) {
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
    }
  },
  actions: {
    GOOGLELOGIN ({commit}) {
      var provider = new Firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      Firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        var user = result.user
        var loginMsg = {token, user}
        store.set('login_msg', loginMsg)
        commit('log_login_msg', loginMsg)
        var id = user.email.split('@')[0]
        db.ref('user/' + id).on('value', function (ref) {
          var val = ref.val()
          if (!val) {
            val = defaultInfo
            val.name = user.displayName
            var updates = {}
            updates[id] = val
            db.ref('user').update(updates)
          }
          store.set('user', val)
          commit('log_user', val)
        })
      }).catch(function (error) {
        console.log('errorCode:' + error.code)
      })
    },
    GET_LEAGUE ({commit}) {
      db.ref('league').on('value', function (ref) {
        store.set('league', ref.val())
        commit('log_league', ref.val())
      })
    },
    GET_RING ({commit}) {
      db.ref('ring').on('value', function (ref) {
        store.set('ring', ref.val())
        commit('log_ring', ref.val())
      })
    },
    GET_AREA ({commit}) {
      db.ref('area').on('value', function (ref) {
        store.set('area', ref.val())
        commit('log_area', ref.val())
      })
    }
  }
})
