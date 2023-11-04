<template>
  <header>
    <nav>
      <router-link to="/"
        ><img src="../../public/LOGO.svg" alt="Logo" />
      </router-link>
      <h1>總統大選開票</h1>
    </nav>
  </header>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "Header",
  setup() {
    // ...Composition API logic
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 60px;
  background: #0d2562;
  margin: -8px !important;
  margin-bottom: 0 !important;
  nav {
    display: flex;

    h1 {
      line-height: 60px;
      margin: 0;
      margin-left: 12px;
      color: #fff;
      font-family: Noto Sans TC;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1.2px;
    }
  }
}
</style>
