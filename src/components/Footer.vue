<template>
  <footer>
    <p>Copyright © 2023 總統即時開票全台地圖本網站 The F2E所有</p>
  </footer>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "Footer",
  setup() {
    // ...Composition API logic
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: #0d2562;
  // height: 35px;
  // padding: 16px;
  // margin: 0 -8px !important;
  margin-bottom: -13px !important;
  display: flex;
  width: 100%;

  p {
    color: #fefbf3;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin: 0;
    padding: 8px 20px;
    // line-height: 35px;
  }
}
</style>
