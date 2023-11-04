<template>
  <div class="side-menu">
    <div class="top-navgation">
      <div class="selection">
        <select name="" id="" class="city">
          <option value="" default>178798</option>
          <option value="">12</option>
          <option value="">12</option>
        </select>
        <select name="" id="" class="area">
          <option value="" default>12131</option>
          <option value="">12</option>
          <option value="">12</option>
        </select>
      </div>
      <div class="candidate-all">
        <div class="candidate">
          <img src="https://picsum.photos/id/684/600/400" alt="">
          <span>gordon</span>
          <span>35%</span>
        </div>
      </div>
    </div>
    <div class="each-area-ratio">
      <div v-for="data in datas" :key="data.name">
          <VoteBar :data="data"/>
      </div>
    </div>
  </div>
</template>
<script>
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
import { ref, reactive } from "vue";
import VoteBar from "@/components/VoteBar";
export default {
  name: "SideMenu",
  components: [VoteBar],
  setup() {

  },
}

</script>