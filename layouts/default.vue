<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Bulmaには画面サイズに応じてdisplay: noneする機能がないので自分で作るしかない
// https://stackoverflow.com/questions/51848020/how-to-hide-a-column-under-a-break-point-tablet-with-bulma
@media (max-width: 768px) {
  .show-on-mobile {
    display: block;
  }
  .hide-on-mobile {
    display: none;
  }
}

@media (min-width: 769px) {
  .show-on-mobile {
    display: none;
  }
  .hide-on-mobile {
    display: block;
  }
}
</style>
