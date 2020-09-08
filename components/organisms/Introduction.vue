<template>
  <div class="introduction">
    <nav class="navbar is-primary show-on-mobile">
      <div class="navbar-brand">
        <div class="navbar-item">
          <h1>みんなのメモ帳</h1>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button
            v-if="$store.state.isLoggedin"
            class="button is-danger"
            @click="signOut"
          >
            ログアウト
          </button>
        </div>
      </div>
    </nav>
    <section class="hero is-primary hide-on-mobile">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">みんなのメモ帳</h1>
          <h2 class="subtitle is-hidden-mobile">
            Twitterユーザーが「一つだけ」コメントを残せるサービスです。閲覧するだけならアカウント不要!!
          </h2>
          <button
            v-if="$store.state.isLoggedin"
            class="button is-danger"
            @click="signOut"
          >
            ログアウト
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('twitterSignOut')
    },
  },
}
</script>

<style lang="scss" scoped>
.introduction {
  z-index: 10;

  .user-box {
    margin: 0;
  }
}

.navbar {
  h1 {
    padding-left: 1rem;
    line-height: 3rem;
    font-size: 150%;
    font-weight: bold;
  }
}
</style>
