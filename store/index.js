import * as firebase from 'firebase/app'
import 'firebase/auth'
import '~/plugins/firebase-custom.js'

export const state = () => ({
  isLoggedin: false,
  firebaseUid: null,
  userName: null
})

export const mutations = {
  storeAuthInfo(state, payload) {
    state.isLoggedin = true
    state.firebaseUid = payload.firebaseUid
    state.userName = payload.userName
  },
  deleteAuthInfo(state) {
    state.isLoggedin = false
    state.firebaseUid = null
    state.userName = null
  },
  saveUser(state, payload) {
    state.counter = payload.number
  }
}

export const actions = {
  twitterSignIn({ dispatch }) {
    firebase.auth().signInWithRedirect(new firebase.auth.TwitterAuthProvider())
    dispatch('twitterAuthStateChanged')
  },
  twitterSignOut({ dispatch }) {
    firebase.auth().signOut()
    dispatch('twitterAuthStateChanged')
  },
  twitterAuthStateChanged({ dispatch, commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid } = user
        commit('storeAuthInfo', {
          userName: displayName,
          firebaseUid: uid
        })
      } else {
        commit('deleteAuthInfo')
      }
    })
  }
}
