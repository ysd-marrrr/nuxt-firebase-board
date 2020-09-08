<template>
  <div class="columns is-multiline messages">
    <div class="container">
      <div
        v-for="line in $store.state.displayMessages"
        :key="line.id"
        class="column is-full"
      >
        <div class="columns message-line is-vcentered">
          <div class="column is-2">{{ line.data.userName }}</div>
          <div class="column is-8">{{ line.data.comment }}</div>
          <div class="column is-2">
            <div
              v-if="
                $store.state.isLoggedin && $store.state.firebaseUid === line.id
              "
              class="buttons"
            >
              <button class="button is-danger" @click="deleteMessage">
                削除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-full is-centered">
        <div class="buttons">
          <button class="button" @click="writeTestData">
            私用 関係者以外立ち入り禁止
          </button>
          <button class="button is-danger" @click="writeTestData">
            Delete something
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('firestoreMessageCheck')
  },
  methods: {
    displayMesssageUpdate() {
      this.$store.dispatch('firestoreMessageCheck')
    },
    deleteMessage() {
      if (window.confirm('投稿したコメントを削除します')) {
        this.$store.dispatch('firestoreMessageDelete')
      }
    },
    writeTestData() {
      this.$store.dispatch('firestoreWrite', {
        uid: 'abracadabra',
        userName: 'hoge',
        comment: 'Improper comment!',
        date: 0,
      })
    },
    deleteTestData() {
      this.$store.dispatch('firestoreTestdataDelete')
    },
  },
}
</script>

<style lang="scss" scoped>
.messages {
  flex: 1;
  position: relative;
  overflow-y: scroll;
  z-index: 0;
  padding: 10px 0;
}

.message-line {
  border-bottom: 1px dashed gray;
}
</style>
