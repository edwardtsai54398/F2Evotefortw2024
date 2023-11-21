<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import SideMenu from "./SideMenu.vue";
import TwMap from "./TwMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { transformName } from "../../utils/method";
const store = useStore();

const years = [2020, 2016, 2012];
const partySymbol = ref(["國民黨", "民進黨", "親民黨"]);

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
                        <span>
                            {{ currentYear }}
                            <span></span>
                        </span>
                        <span>總統大選</span>
                    </div>
                    <div class="year-selection">
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
            </div>
        </div>
        <Footer/>
    </div>
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
</style>
