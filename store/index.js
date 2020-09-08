import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firestoreDb } from '~/plugins/firebase-custom.js'

export const state = () => ({
  isLoggedin: false,
  firebaseUid: null,
  userName: null,
  displayMessages: null,
  isPosted: false,
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
    state.isPosted = false
  },
  saveUser(state, payload) {
    state.counter = payload.number
  },
  updateDisplayMessage(state, payload) {
    state.displayMessages = payload
  },
  setPosted(state, payload) {
    state.isPosted = payload
  },
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
  twitterAuthStateChanged({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid } = user
        commit('storeAuthInfo', {
          userName: displayName,
          firebaseUid: uid,
        })
      } else {
        commit('deleteAuthInfo')
      }
    })
  },
  firestoreMessageCheck({ state, commit }) {
    const recvMessages = []

    firestoreDb
      .collection('board1')
      .get()
      .then((querySnapshot) => {
        // Firestoreからやってきたデータを扱いやすい形に変換する
        querySnapshot.forEach(function (doc) {
          recvMessages.push({ id: doc.id, data: doc.data() })

          // 前に投稿したものがある場合は投稿フォームを隠す
          if (doc.id === state.firebaseUid) {
            commit('setPosted', true)
          }
        })
      })
      .catch((error) => {
        console.error('Error getting document:', error)
      })
      .finally(function () {
        // 成功した場合はメッセージのリストを、失敗したときは空のリストを使って表示させる
        commit('updateDisplayMessage', recvMessages)
      })
  },
  firestoreMessageAdd({ state, dispatch }, payload) {
    dispatch('firestoreWrite', {
      uid: state.firebaseUid,
      userName: state.userName,
      comment: payload.messageText,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
  },

  firestoreWrite({ commit }, payload) {
    firestoreDb
      .collection('board1')
      .doc(payload.uid)
      .set({
        userName: payload.userName,
        comment: payload.comment,
        date: payload.date,
      })
      .then(() => {
        console.log('Document successfully written!')
        commit('setPosted', true)
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
      .finally(() => {
        // 成功しようが失敗しようが最新の状態を取得する
        this.dispatch('firestoreMessageCheck')
      })
  },
  firestoreMessageDelete({ state, commit }) {
    firestoreDb
      .collection('board1')
      .doc(state.firebaseUid)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!')
        commit('setPosted', false)
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)
      })
      .finally(() => {
        // 成功しようが失敗しようが最新の状態を取得する
        this.dispatch('firestoreMessageCheck')
      })
  },
  firestoreTestdataDelete() {
    firestoreDb
      .collection('board1')
      .doc('hoge')
      .delete()
      .then(function () {
        console.log('Document successfully deleted!')
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)
      })
      .finally(() => {
        // 成功しようが失敗しようが最新の状態を取得する
        this.dispatch('firestoreMessageCheck')
      })
  },
}
