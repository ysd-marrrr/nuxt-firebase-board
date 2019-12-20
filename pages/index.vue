<template>
  <div class="main-page-wrapper">
    <Introduction />
    <Messages />
    <MessageCreateArea />
  </div>
</template>

<script>
import Introduction from '~/components/organisms/Introduction.vue'
import Messages from '~/components/organisms/Messages.vue'
import MessageCreateArea from '~/components/organisms/MessageCreateArea.vue'

export default {
  components: {
    Introduction,
    Messages,
    MessageCreateArea
  }
}
</script>

<style>
.main-page-wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: none;
}
</style>
