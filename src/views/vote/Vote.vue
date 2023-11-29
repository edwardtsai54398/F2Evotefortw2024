<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import SideMenu from "./SideMenu.vue";
import TwMap from "./TwMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { transformName } from "../../utils/method";
const store = useStore();

const years = [2020, 2016, 2012];
const partySymbol = ref(["藍汪黨", "綠肉球黨", "大橘貓黨"]);

const currentYear = ref(2020);
const changeYear = (year) => {
    currentYear.value = year;
    store.commit("setCurrentYear", currentYear.value);
    let level = store.state.currentZone.level
    if(level === "nation"){
        store.dispatch("fetchData", { fileName: "all", isCity: true });
    }else if(level === "city"){
        store.dispatch("fetchData", {fileName: transformName(store.state.currentZone.city), isCity: true});
    }else if(level ==="district"){
        let startDistrict = store.state.currentZone.district
        let endDistrict = store.state.countyData.forEach((district, index)=>{
            if(district.name === startDistrict){
                if(index+1 === store.state.countyData.length){
                    return ""
                }else{
                    return store.state.countyData[index+1].name
                }
            }
        })
        store.dispatch("fetchData", {fileName: transformName(store.state.currentZone.city), isCity: false, county: [startDistrict,endDistrict]});
    }
}

const isYearShow = ref(false);
const openYear = () => {
    if (!isYearShow.value) {
        isYearShow.value = true;
    } else {
        isYearShow.value = false;
    }
}
const dialog = ref(null);
const openExplanation = () => {
    dialog.value.showModal();
}
const closeDialog = () => {
    dialog.value.close();
}


</script>

<template>
    <Header/>
    <div class="layout-content" style="height:100vh">
        <div class="layout-content">
            <div class="vote-page">
                <SideMenu />
                <TwMap />
                <div class="main-title">
                    <div class="title">
                        <span class="year-decoration">
                            {{ currentYear }}
                            <span class="double-txt">{{ currentYear }}</span>
                        </span>
                        <span class="president-title">總統大選</span>
                    </div>
                    <div class="year-selection" ref="yearSelections" :class="{'no-show': !isYearShow}">
                        <ul>
                            <li v-for="year in years" :key="year" :class="{active: year === currentYear}" @click="changeYear(year)">
                                <button :class="{active: year === currentYear}">{{ year }}</button>
                                <span class="decoration" :class="{'deco-active': year === currentYear}"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="party-symbol">
                        <ul>
                            <li v-for="symbol in partySymbol" :key="symbol">
                                <span></span>
                                {{ symbol }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mobile-symbol" ref="year">
                    <span :class="{ active: isYearShow }" @click="openYear">年份</span>
                    <span @click="openExplanation">說明</span>
                </div>
            </div>
        </div>
        <div class="vote-footer"><Footer/></div>
    </div>
    <dialog ref="dialog">
        <h6>使用說明</h6>
        <p>
            下方的表格與上方的地是圖互相連動的，請放心從任何一邊進入有興趣的區域查看詳細選情。資訊會自動隨著地區的層級改變，地圖的「回全國」按鈕，即可隨時回到最上層觀看最全面的選情動態。
        </p>
        <h6>政黨代表色</h6>
        <ul>
            <li v-for="symbol in partySymbol" :key="symbol">
                <span></span>
                {{ symbol }}
            </li>
        </ul>
        <button @click="closeDialog">X</button>
    </dialog>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";
.layout-content{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.vote-page {
    display: flex;
    width: 100%;
    padding-top: 60px;
    height: 100%;
    max-width: 1280px;
    justify-content: space-between;
    margin: auto;
    padding: 80px 0;
}

.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
.vote-footer{
    display: none;
}
@include desktop{
    .vote-footer{
        display: block;
    }

}
</style>
