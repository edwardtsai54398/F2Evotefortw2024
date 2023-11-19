<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import SideMenu from "./SideMenu.vue";
import TwMap from "./TwMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const store = useStore();

const years = [2020, 2016, 2012];
const partySymbol = ref(["國民黨", "民進黨", "親民黨"]);

const currentYear = ref(2020);
const changeYear = (year) => {
    currentYear.value = year;
    store.commit("setCurrentYear", currentYear.value);
    store.dispatch("fetchData", { fileName: "all", isCity: true });
}

</script>

<template>
    <Header/>
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
    <Footer/>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";

.vote-page {
    display: flex;
    max-width: 1280px;
    justify-content: space-between;
    margin: auto;
}

.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
