<script setup>
import { ref } from 'vue'
import * as d3 from 'd3'
import VoteBar from "@/components/VoteBar.vue";
const datas = [
  {
    name: "taipei",
    vote: {
      "民進黨": 1000000,
      "國民黨": 54515,
      "民眾黨": 850000,
    },
  },
  {
    name: "taichung",
    vote: {
      "民進黨": 200000,
      "國民黨": 60000,
      "民眾黨": 450000,
    },
  },
]
const count = ref(0)
// d3.csv.parse('./public/2020_presedent/總統-A05-1-候選人得票數一覽表(中　央).csv').then((data)=>{
//   console.log(data);
// })

</script>

<template>
  <h2>歷史開票</h2>
  <div class="map"></div>
  <div v-for="data in datas" :key="data.name">
          <VoteBar :data="data"/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/all.scss";
// @import "@/assets/scss/page/about.scss";
</style>
