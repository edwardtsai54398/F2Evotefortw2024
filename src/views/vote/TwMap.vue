<script setup>
import { ref, onMounted, nextTick, reactive, watch, computed, onBeforeMount } from "vue";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useStore } from 'vuex'
const store = useStore()

const mapWidth = ref(600);
const mapProportion = ref(1.25)
mapSize()
const mapHeight = ref(mapWidth.value * mapProportion.value);

const taiwanMapData = ref([]);
const cityMapData = ref([]);
const districtMapData = ref([]);
const currentLevel = ref("nation")
const svgScale = ref(1);
const mapTranslate = reactive({ x: 0, y: 0 });

//RWD
let scale = 5500;
let LontitudeAndLatitude = [122, 24.5]
function mapScaleSet() {
    let wWidth = window.innerWidth;
    if (wWidth >= 1000) {
        scale = 9000;
    } else if (wWidth < 1000 && wWidth >= 700) {
        scale = 9000;
    } else if (wWidth < 700) {
        scale = 6500;
        LontitudeAndLatitude = [123.7, 24]
    }
}
mapScaleSet()

function mapSize() {
    let wWidth = window.innerWidth;
    if (wWidth >= 700) {
        mapWidth.value = 600
        mapProportion.value = 1.25
    } else {
        mapWidth.value = 350
        mapProportion.value = 1.6
    }
}

function RWDpropsChange() {
    mapScaleSet()
    mapSize()
}
onMounted(() => {
    window.addEventListener("resize", RWDpropsChange)
})
onBeforeMount(() => {

    window.removeEventListener("resize", RWDpropsChange)
})
//抓台灣地圖資料
function getMap(callback, level = "nation", zone = "nation") {
    let file = "";
    if (level === "nation") {
        file = "nation/COUNTY_MOI_1121110.json";
    } else if (level === "city") {
        file = "city/TOWN_MOI_1121110.json";
    } else if (level === "district") {
        file = "district/VILLAGE_NLSC_121_1120928.json";
    }

    let mapData;
    let choosedZoneMapData = [];
    //開發用
    // let prefixURL = 'public/tw_map/'
    //上線用
    let prefixURL = '/tw_map/'
    return d3.json(`${prefixURL}${file}`).then((data) => {
        if (level === "nation") {
            mapData = topojson.feature(data, data.objects.COUNTY_MOI_1121110);
            taiwanMapData.value = mapData.features;
            choosedZoneMapData = mapData.features;

        } else if (level === "city") {
            mapData = topojson.feature(data, data.objects.TOWN_MOI_1121110);
            choosedZoneMapData = mapData.features.filter(
                (district) => district.properties.COUNTYNAME === zone
            );
            cityMapData.value = choosedZoneMapData;

        } else if (level === "district") {
            mapData = topojson.feature(data, data.objects.VILLAGE_NLSC_121_1120928);
            choosedZoneMapData = mapData.features.filter((village) => village.properties.TOWNNAME === zone);
            districtMapData.value = choosedZoneMapData;
        }

        callback(choosedZoneMapData)
    })


}
//畫台灣地圖
let projection = d3.geoMercator().center(LontitudeAndLatitude).scale(scale);
let path = d3.geoPath();

function drawMap(data, zone) {
    const d3map = d3.select("#nation-map");
    let mapSelectClass;
    let level = currentLevel.value
    if (level === "nation") {
        mapSelectClass = `.city [data-key=taiwan]`;
    } else if (level === "city") {
        mapSelectClass = `.district [data-city=${zone}]`;
    } else if (level === "district") {
        mapSelectClass = `.village [data-district=${zone}]`;
    }
    nextTick(() => {
        d3map
            .selectAll(mapSelectClass)
            .data(data)
            .join("g")
            .append("path")
            .attr("d", path.projection(projection))
            .attr("stroke-width", 1 / svgScale.value)
    });

}

//點擊區域setCurrentZone
function setCurrentZone(ZoneProperties) {
    if (!ZoneProperties.TOWNNAME) {

        store.commit("setCurrentZone", {
            level: "city",
            city: ZoneProperties.COUNTYNAME,
            district: ""
        })
    } else if (ZoneProperties.TOWNNAME) {

        store.commit("setCurrentZone", {
            level: "district",
            city: ZoneProperties.COUNTYNAME,
            district: ZoneProperties.TOWNNAME
        })
    }
}
//點擊縮放區域
function zoomZone(zoneName) {
    let zone = document.querySelector(`#${zoneName}`)
    let zoneWidth = zone.getBBox().width
    let zoneHeight = zone.getBBox().height
    let zoneX = zone.getBBox().x
    let zoneY = zone.getBBox().y
    let scale = Math.min(mapWidth.value / zoneWidth, mapHeight.value / zoneHeight) * 0.8;
    svgScale.value = scale;

    mapTranslate.x = -zoneX - zoneWidth / 2 + mapWidth.value / 2
    mapTranslate.y = -zoneY - zoneHeight / 2 + mapHeight.value / 2
}
//回全國
function backtoNation() {
    store.commit("setCurrentZone", {
        level: "nation",
        city: "",
        district: ""
    })
    cityMapData.value = []
    districtMapData.value = []
}
function zoomToNation() {
    svgScale.value = 1
    mapTranslate.x = 0
    mapTranslate.y = 0
    currentLevel.value = "nation"
}
onMounted(() => {
    getMap((mapData) => {
        drawMap(mapData)
    });

});
import { ElMessage } from 'element-plus'
watch(store.state.currentZone, (newVal) => {
    if (currentLevel.value === "district" && newVal.level === "city") {
        districtMapData.value = []
    }
    if (newVal.level === "nation") {
        currentLevel.value = newVal.level
        zoomToNation()
    } else if (newVal.level === "city") {

        currentLevel.value = newVal.level
        getMap((mapData) => {
            drawMap(mapData, newVal.city)

        }, "city", newVal.city);

        zoomZone(newVal.city)
    } else if (newVal.level === "district") {
        getMap((mapData) => {
            if (mapData.length === 0) {
                ElMessage({
                    message: '沒有村里地圖資料，請以票選數據為主',
                    type: 'warning',
                    offset: 60,
                    duration: 5000,
                    showClose: true
                })

            } else if (mapData.some((village) => village.properties.VILLNAME == '')) {
                ElMessage({
                    message: '村里地圖資料有誤，請以票選數據為主',
                    type: 'warning',
                    offset: 60,
                    duration: 5000,
                    showClose: true
                })

                currentLevel.value = newVal.level
                drawMap(mapData, newVal.district)
            } else {
                currentLevel.value = newVal.level
                drawMap(mapData, newVal.district)
            }
        }, "district", newVal.district);

        zoomZone(newVal.district)
    }
})
//計算縣市票選最高
const nationVoteData = ref([])
const cityVoteData = ref([])
const districtVoteData = ref([])
const voteAllData = computed(() => {
    return store.state.allData
})
watch(voteAllData, (newVal) => {
    if (store.state.currentZone.level == 'nation') {
        nationVoteData.value = newVal
    } else if (store.state.currentZone.level == 'city') {
        cityVoteData.value = newVal
    } else if (store.state.currentZone.level == 'district') {
        // console.log(newVal);
        districtVoteData.value = newVal
    }
}, { immediate: true, deep: true })
function findHighestParty(voteData, zoneName) {
    let blue = '#8db5db'
    let green = '#749c74'
    let orng = '#ffb086'
    let gray = '#aaa'
    let zoneVoteData = voteData.find((voteZone) => voteZone.name === zoneName)
    if (!zoneVoteData) {
        return gray
    }
    let vote = zoneVoteData.vote
    let partyArr = Object.keys(vote)
    let maxParty = partyArr.reduce((partyFront, partyBehind) =>
        (vote[partyBehind] > vote[partyFront]) ? partyBehind : partyFront
        , partyArr[0])
    switch (maxParty) {
        case "民進黨":
            return green;
        case "國民黨":
            return blue;
        case "親民黨":
            return orng;
        default:
            return gray;
    }
}
</script>

<template>
    <div class="map-container">
        <div class="map" :style="`width:${mapWidth}px;height:${mapHeight}px`">
            <button class="backto_nation" @click="backtoNation" :class="{ 'show': currentLevel !== 'nation' }">
                <img class="blue-arrow" src="@/assets/images/Arrows_Lineal.png" alt="返回符號" >
                <img class="white-arrow" src="@/assets/images/A111-_Arrows_Lineal.png" alt="返回符號" >
                <span>回全國</span>
            </button>
            <svg ref="mapRef" :style="`transform:scale(${svgScale})`">
                <g id="nation-map" :style="`transform:translate(${mapTranslate.x}px,${mapTranslate.y}px)`">
                    <g class="city" :class="{ 'current_level': currentLevel === 'nation' }">
                        <g v-for="city in taiwanMapData" :id="city.properties.COUNTYNAME" data-key="taiwan" :key="city.properties.COUNTYCODE" @click="setCurrentZone(city.properties);" :fill="findHighestParty(nationVoteData, city.properties.COUNTYNAME)">
                            <title>{{ city.properties.COUNTYNAME }}</title>
                        </g>
                    </g>
                    <g class="district" :class="{ 'current_level': currentLevel === 'city' }">
                        <g v-for="district in cityMapData" :key="district.properties.TOWNCODE" :id="district.properties.TOWNNAME" :data-city="district.properties.COUNTYNAME" @click="setCurrentZone(district.properties);" :fill="findHighestParty(cityVoteData, district.properties.TOWNNAME)">
                            <title>{{ district.properties.TOWNNAME }}</title>
                        </g>
                    </g>
                    <g class="village" :class="{ 'current_level': currentLevel === 'district' }">
                        <g v-for="village in districtMapData" :key="village.properties.VILLCODE" :id="village.properties.VILLNAME" :data-district="village.properties.TOWNNAME" :fill="findHighestParty(districtVoteData, village.properties.VILLNAME)">
                            <title>{{ village.properties.VILLNAME }}</title>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";

.map-container {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
}

.map {
    // border: 1px solid #000;
    position: relative;

    &>svg {
        display: block;
        width: 100%;
        height: 100%;
        transition: 0.8s 0.3s;
    }

    #nation-map {
        display: block;
        height: 100%;
        width: 100%;
        transition: .8s;
    }

    .city,
    .district,
    .village {
        opacity: 0.3;

        &>g {
            stroke: $bg;
            stroke-width: 0.5;
            cursor: pointer;
            transition: 0.5s;
        }

        &.current_level {
            opacity: 1;

            &>g:hover {
                stroke: #000;
            }
        }


    }
}

.backto_nation {
    border-radius: 4px;
    background-color: $bg;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    padding: 4px;
    transition: .8s;
    border: 2px solid $blue-d;

    span {
        color: $blue-d;
        font-size: $s-font;
        margin-left: $sp1;
    }
    .blue-arrow{
        display: inline-block;
    }
    .white-arrow{
        display: none;
    }
    &.show {
        opacity: 1;
        visibility: visible;
        
        .blue-arrow{
            display: none;
        }
        .white-arrow{
            display: inline-block;
        }
    }
    &:hover{
        background-color: $blue-d;
        span{
            color: $bg;
        }
    }
}

@media screen and (max-width: 767px) {
    .backto_nation {

        top: 20px;
        right: 20px;
    }
}

@include pad-V {
    .backto_nation {
        bottom: 20px;
        left: 20px;
    }
}</style>
