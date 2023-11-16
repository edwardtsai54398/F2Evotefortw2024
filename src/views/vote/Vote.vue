<script setup>
// import SideMenu from "@/components/SideMenu.vue";
import SideMenu from "./SideMenu.vue";
import TwMap from "./TwMap.vue";


</script>

<template>
    <div class="vote-page">
        <h2>歷史開票</h2>
        <SideMenu />
        <TwMap />
    </div>
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
