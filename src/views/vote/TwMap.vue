<script setup>
import { ref, onMounted, nextTick, reactive, watch } from "vue";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useStore } from 'vuex'
const store = useStore()

const mapWidth = ref(600);
const mapHeight = ref(750);

const taiwanMapData = ref([]);
const cityMapData = ref([]);
const districtMapData = ref([]);
const currentLevel = ref("nation")
const svgScale = ref(1);
const mapTranslate = reactive({ x: 0, y: 0 });

//RWD
let scale = 5500;
let wWidth = window.innerWidth;
if (wWidth >= 1280) {
    scale = 9000;
} else if (wWidth < 1280 && wWidth >= 768) {
    scale = 7000;
} else if (wWidth < 768) {
    scale = 5500;
}

//抓台灣地圖資料
function getMap(level = "nation", zone = "nation") {
    // console.log(zone);
    let file = "";
    if (level === "nation") {
        file = "nation/COUNTY_MOI_1121110.json";
    } else if (level === "city") {
        file = "city/TOWN_MOI_1121110.json";
    } else if (level === "district") {
        file = "district/VILLAGE_NLSC_121_1120928.json";
    }

    d3.json(`public/tw_map/${file}`).then((data) => {
        drawMap("#nation-map", data);
    });

    //畫台灣地圖
    let projection = d3.geoMercator().center([122, 24.5]).scale(scale);
    let path = d3.geoPath();

    function drawMap(el, data) {
        const d3map = d3.select(el);
        let mapData;
        let mapSelectClass;
        let choosedZoneMapData = [];
        let level = currentLevel.value
        if (level === "nation") {
            mapData = topojson.feature(data, data.objects.COUNTY_MOI_1121110);
            taiwanMapData.value = mapData.features;
            mapSelectClass = `.city [data-key=taiwan]`;
            choosedZoneMapData = mapData.features;
        } else if (level === "city") {
            mapData = topojson.feature(data, data.objects.TOWN_MOI_1121110);
            choosedZoneMapData = mapData.features.filter(
                (district) => district.properties.COUNTYNAME === zone
            );
            cityMapData.value = choosedZoneMapData;
            mapSelectClass = `.district [data-city=${zone}]`;
        } else if (level === "district") {
            mapData = topojson.feature(data, data.objects.VILLAGE_NLSC_121_1120928);
            choosedZoneMapData = mapData.features.filter((village) => village.properties.TOWNNAME === zone);
            districtMapData.value = choosedZoneMapData;
            mapSelectClass = `.village [data-district=${zone}]`;
        }

        nextTick(() => {
            d3map
                .selectAll(mapSelectClass)
                .data(choosedZoneMapData)
                .join("g")
                .append("path")
                .attr("d", path.projection(projection))
                .attr("stroke-width", 1/svgScale.value)
        });
        
    }
}


//點擊區域顯示投票結果
function setCurrentZone(ZoneProperties) {
    if (!ZoneProperties.TOWNNAME) {
        store.commit("setCurrentZone", {
            level: "city",
            city: ZoneProperties.COUNTYNAME,
            district: ""
        })
    } else if (ZoneProperties.TOWNNAME) {
        zoomZone(ZoneProperties.TOWNNAME)
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
    console.log(zone.getBBox());
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
    getMap();
});

watch(store.state.currentZone, (newVal) => {
    if (currentLevel.value === "district" && newVal.level === "city") {
        districtMapData.value = []
    }
    currentLevel.value = newVal.level
    if (newVal.level === "nation") {
        zoomToNation()
    } else if (newVal.level === "city") {
        zoomZone(newVal.city)
        getMap("city", newVal.city);
    } else if (newVal.level === "district") {
        zoomZone(newVal.district)
        getMap("district", newVal.district);
    }
})
</script>

<template>
    <div class="map" :style="`width:${mapWidth}px;height:${mapHeight}px`">
        <button class="backto_nation" @click="backtoNation"><img src="/images/Arrows_Lineal.png" alt=""><span>回全國</span></button>
        <svg ref="mapRef" :style="`transform:scale(${svgScale})`">
            <g id="nation-map" :style="`transform:translate(${mapTranslate.x}px,${mapTranslate.y}px)`">
                <g class="city" :class="{ 'current_level': currentLevel === 'nation' }">
                    <g v-for="city in taiwanMapData" :id="city.properties.COUNTYNAME" data-key="taiwan" :key="city.properties.COUNTYCODE" 
                    @click="setCurrentZone(city.properties);">
                        <title>{{ city.properties.COUNTYNAME }}</title>
                    </g>
                </g>
                <g class="district" :class="{ 'current_level': currentLevel === 'city' }" >
                    <g v-for="district in cityMapData" :key="district.properties.TOWNCODE" :id="district.properties.TOWNNAME" :data-city="district.properties.COUNTYNAME" 
                    @click="setCurrentZone(district.properties);">
                        <title>{{ district.properties.TOWNNAME }}</title>
                    </g>
                </g>
                <g class="village" :class="{ 'current_level': currentLevel === 'district' }" >
                    <g v-for="village in districtMapData" :key="village.properties.VILLCODE" :id="village.properties.VILLNAME" :data-district="village.properties.TOWNNAME">
                        <title>{{village.properties.VILLNAME}}</title>
                    </g>
                </g>
            </g>
        </svg>
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";

.map {
    border: 1px solid #000;
    position: relative;

    // overflow: hidden;
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

}

.city,
.village {
    &>g {
        fill: $green;

    }
}

.district {
    fill: $blue-l;
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

.backto_nation {
    border-radius: 4px;
    background-color: $bg;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    bottom: 20px;
    left: 20px;
    opacity: 1;
    visibility: visible;
    padding: 4px;

    span {
        color: $blue-d;
        font-size: $xs-font;
        margin-left: $sp1;
    }
}</style>
