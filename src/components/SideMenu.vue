<template>
  <div class="side-menu">
    <div class="top-navgation">
      <div class="selection">
        <div class="city" @click="openCitySelection" :class="{on: citySelectionOpen}">
          <img src="../../public/arrow-active.svg" alt="" class="city-arrow" :class="{active: citySelectionOpen}">
          <span v-if="!currentCity">選擇縣市</span>
          <span v-else>{{ currentCity }}</span>
          <ul class="option" v-show="citySelectionOpen">
            <li v-for="city in cities" :key="city" @click="selectCity(city)">{{ city }}</li>
          </ul>
        </div>
        <div class="area">
          <img src="../../public/arrow.svg" alt="" class="area-arrow" :class="{active: citySelectionOpen}">
          <span>選擇區域</span>
        </div>
      </div>
      <div class="candidate-all">
        <div class="candidate" v-for="candidate in candidateVoteRation" :key="candidate.name">
          <img :src="candidate.imgUrl" alt="candidate.name">
          <span>{{ candidate.name }}</span>
          <span class="decoration" :class="candidate.class">----------------</span>
          <span>{{ candidate.ration }}%</span>
        </div>
      </div>
    </div>
    <div class="each-area-ratio">
      <div class="title">
        <span>縣市</span>
        <span>得票占比</span>
      </div>
      <div v-for="data in allData" :key="data.name">
          <VoteBar :data="data"/>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import VoteBar from "./VoteBar.vue";
import { useStore } from "vuex";
import { transformName } from "../utils/method";
import { candidates } from '../data';
export default {
  name: "SideMenu",
  components: { VoteBar },
  setup() {
    const store = useStore();

    const cities = ["台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市", "基隆市", "新竹市", "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "屏東縣", "台東縣", "花蓮縣", "宜蘭縣", "金門縣", "連江縣", "澎湖縣"];
    const citySelectionOpen = ref(false);
    const openCitySelection = () => {
      citySelectionOpen.value = !citySelectionOpen.value;
    }
    const currentCity = ref("");
    const selectCity = (city) => {
      currentCity.value = city;
      store.dispatch("fetchData", transformName(city));
    }
    const allData = computed(() => {
      return store.state.allData;
    })

    // 處理各政黨的得票率數字
    const green = computed(() => {
      return store.state.taiwanResults.green;
    })
    const blue = computed(() => {
      return store.state.taiwanResults.blue;
    })
    const orange = computed(() => {
      return store.state.taiwanResults.orange;
    })
    const candidateVoteRation = reactive([
      {
        name: "蔡英文",
        ration: green,
        imgUrl: '../../public/candidate/tsai.png',
        class: "green",
      },
      {
        name: "韓國瑜",
        ration: blue,
        imgUrl: '../../public/candidate/han.png',
        class: "blue",
      },
      {
        name: "宋楚瑜",
        ration: orange,
        imgUrl: '../../public/candidate/song.png',
        class: "orange",
      },
    ]);


    onMounted(() => {
      store.dispatch("fetchData", "all");
    })
    
    return { 
      allData,
      cities,
      citySelectionOpen,
      openCitySelection,
      selectCity,
      currentCity,
      candidateVoteRation,
    };
  },
}

</script>