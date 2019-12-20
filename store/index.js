import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreDb } from '~/plugins/firebase-custom.js'

export const state = () => ({
  isLoggedin: false,
  firebaseUid: null,
  userName: null,
  displayMessages: null,
  isPosted: false
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
  firestoreMessageCheck({ commit }) {
    const recvMessages = []

    firestoreDb
      .collection('board1')
      .get()
      .then((querySnapshot) => {
        // Firestoreからやってきたデータを扱いやすい形に変換する
        querySnapshot.forEach(function(doc) {
          recvMessages.push({ id: doc.id, data: doc.data() })
        })
      })
      .catch((error) => {
        console.error('Error getting document:', error)
      })
      .finally(function() {
        // 成功した場合はメッセージのリストを、失敗したときは空のリストを使って表示させる
        console.log(recvMessages)
        commit('updateDisplayMessage', recvMessages)
      })
  },
  firestoreMessageAdd({ state, commit }, payload) {
    const postedDate = new Date()
    const postedTimestamp = Math.floor(postedDate.getTime() / 1000)
    firestoreDb
      .collection('board1')
      .doc(state.firebaseUid)
      .set({
        userName: state.userName,
        comment: payload.messageText,
        date: postedTimestamp
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }
}
