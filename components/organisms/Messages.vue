<template>
  <div class="columns is-multiline messages">
    <div class="container">
      <div v-for="idx in Number(100)" :key="idx" class="column is-full">
        <div class="columns message-line message-1 is-vcentered">
          <div class="column is-2">なまえ{{ idx }}</div>
          <div class="column is-8">いいたいこと</div>
          <div class="column is-2">
            <div class="buttons">
              <button class="button">編集</button>
              <button class="button is-danger">削除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messages {
  flex: 1;
  position: relative;
  overflow: scroll;
  z-index: 0;
  padding: 10px 0;
}

.message-line {
  border-bottom: 1px dashed gray;
}
</style>
