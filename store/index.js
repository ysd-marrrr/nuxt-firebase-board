import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreDb } from '~/plugins/firebase-custom.js'

export const state = () => ({
  isLoggedin: false,
  firebaseUid: null,
  userName: null,
  displayMessages: null
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
  },
  updateDisplayMessage(state, payload) {
    state.displayMessages = payload
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
  },
  firestoreMessageCheck({ dispatch, commit }) {
    const recvMessages = []

    firestoreDb
      .collection('board1')
      .get()
      .then((querySnapshot) => {
        // Firestoreからやってきたデータを扱いやすい形に変換する
        querySnapshot.forEach(function(doc) {
          recvMessages.push(doc.data())
        })
      })
      .catch((error) => {
        console.error('Error getting document:', error)
      })
      .finally(function() {
        commit('updateDisplayMessage', recvMessages)
      })
  }
}
