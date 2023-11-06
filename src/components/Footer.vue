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
  height: 35px;
  margin: -8px !important;
}
p {
  color: #fefbf3;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  line-height: 35px;
}
</style>
