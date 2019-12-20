<template>
  <div class="columns is-multiline messages">
    <div class="container">
      <div
        v-for="line in $store.state.displayMessages"
        :key="line.id"
        class="column is-full"
      >
        <div class="columns message-line message-1 is-vcentered">
          <div class="column is-2">{{ line.data.userName }}</div>
          <div class="column is-8">{{ line.data.comment }}</div>
          <div class="column is-2">
            <div
              v-if="
                $store.state.isLoggedin && $store.state.firebaseUid === line.id
              "
              class="buttons"
            >
              <button class="button">編集</button>
              <button @click="deleteMessage" class="button is-danger">
                削除
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
    }
  }
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
