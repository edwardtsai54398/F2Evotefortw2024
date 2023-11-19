<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SideMenu from "./SideMenu.vue";
import TwMap from "./TwMap.vue";


</script>

<template>
    <Header />
    <div class="vote-page">
        <SideMenu />
        <TwMap />
        <div class="main-title">
            <div class="title">
                <span>2020</span>
                <span>總統大選</span>
            </div>
            <div class="year-selection">
                <ul>
                    <li v-for="year in years" :key="year" :class="{active: year === currentYear}">
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
    <Footer />
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";

.vote-page {
    display: flex;
    max-width: 1280px;
}

.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
