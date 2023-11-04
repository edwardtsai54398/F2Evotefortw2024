<template>
  <div class="side-menu">
    <div class="top-navgation">
      <div class="selection">
        <img src="../../public/arrow-active.svg" alt="" class="city-arrow" @click="openCitySelection">
        <img src="../../public/arrow.svg" alt="" class="area-arrow">
        <div class="city" @click="openCitySelection" :class="{on: citySelectionOpen}">
          <span v-if="!currentCity">選擇縣市</span>
          <span v-else>{{ currentCity }}</span>
          <ul class="option" v-show="citySelectionOpen">
            <li v-for="city in cities" :key="city" @click="selectCity(city)">{{ city }}</li>
          </ul>
        </div>
        <div class="area">12131</div>
      </div>
      <div class="candidate-all">
        <div class="candidate">
          <img src="https://picsum.photos/id/684/100/100" alt="">
          <span>gordon</span>
          <span>35%</span>
        </div>
      </div>
    </div>
    <div class="each-area-ratio">
      <div class="title">
        <span>縣市</span>
        <span>得票占比</span>
      </div>
      <div v-for="data in datas" :key="data.name">
          <VoteBar :data="data"/>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import VoteBar from "./VoteBar.vue";
export default {
  name: "SideMenu",
  components: { VoteBar },
  setup() {
    const cities = ref(["台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市", "基隆市", "新竹市", "新竹縣", "新北市", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "屏東縣", "台東縣", "花蓮縣", "宜蘭縣", "金門縣", "連江縣"]);
    const citySelectionOpen = ref(false);
    const currentCity = ref("");
    const openCitySelection = () => {
      citySelectionOpen.value = !citySelectionOpen.value;
    }
    const selectCity = (city) => {
      currentCity.value = city;
    }
    
    
    const datas = reactive([
      {
        name: "taipei",
        vote: {
          "民進黨": 1000000,
          "國民黨": 54515,
          "親民黨": 850000,
        },
      },
      {
        name: "taichung",
        vote: {
          "民進黨": 200000,
          "國民黨": 60000,
          "親民黨": 450000,
        },
      },
    ]);
    



    return { 
      datas, 
      cities,
      citySelectionOpen,
      openCitySelection,
      selectCity,
      currentCity,
    };
  },
}

</script>