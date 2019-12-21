<template>
  <div class="message-create-area">
    <div class="container">
      <div v-if="!$store.state.isLoggedin">
        <p>
          ログインするとここに<strong>ひとこと</strong>投稿できるようになります。<br />Twitterアカウントはこのサービスのログインのみに使用し、勝手にTwitterに投稿したりフォローしたりしません。
        </p>
        <button @click="signinWithTwitter" class="button is-info is-fullwidth">
          Twitterアカウントでログイン
        </button>
      </div>
      <div v-if="$store.state.isLoggedin">
        <div class="create-description">
          <h3>メッセージを投稿する</h3>
          <p>
            新規投稿は1度きりです。新しい内容を投稿したい場合は前の投稿を削除してください。
          </p>
        </div>
        <div v-if="!$store.state.isPosted" class="columns is-vcentered">
          <div class="column is-2">{{ $store.state.userName }}</div>
          <div class="column is-8">
            <input
              v-model="inputtedMessage"
              class="input"
              type="text"
              placeholder="なにかいいたいことを入れてみましょう"
            />
          </div>
          <div class="column is-2">
            <div class="buttons">
              <button @click="addMessage" class="button is-primary">
                投稿！
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputtedMessage: ''
    }
  },
  mounted() {
    this.$store.dispatch('twitterAuthStateChanged')
  },
  methods: {
    signinWithTwitter() {
      this.$store.dispatch('twitterSignIn')
    },
    addMessage() {
      this.$store.dispatch('firestoreMessageAdd', {
        messageText: this.inputtedMessage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-create-area {
  box-shadow: 1px -5px 20px 2px #9b7f81;
  bottom: 0;
  padding: 1vh 0;
  width: 100%;
  z-index: 10;
  .container {
    z-index: 15;
  }
}

.create-description {
  padding-bottom: 1vh;
  margin-bottom: 1vh;
  border-bottom: 1px dashed gray;

  h3 {
    font-weight: bold;
    size: 150%;
  }
}
</style>
