<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import SideMenu from "@/components/SideMenu.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const years = [2020, 2016, 2012];
const currentYear = ref(2020);
const partySymbol = ref(["國民黨", "民進黨", "親民黨"]);
const taiwanMapData = ref([]);
const cityMapData = ref([]);
const districtMapData = ref([]);
const mapWidth = ref(600)
const mapHeight = ref(750)
const svgScale = ref(1)
//抓台灣地圖資料
function getMap(level = "nation", zone = "nation") {
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
    let scale = 5500;
    let wWidth = window.innerWidth;
    if (wWidth >= 1280) {
        scale = 9000;
    } else if (wWidth < 1280 && wWidth >= 768) {
        scale = 7000;
    } else if (wWidth < 768) {
        scale = 5500;
    }

    
    let projection = d3.geoMercator().center([122, 24.5]).scale(scale);
    let path = d3.geoPath();

    function drawMap(el, data) {
        const d3map = d3.select(el);
        let mapData;
        let mapSelectClass;
        let choosedZoneMapData = [];
        if (level === "nation") {
            // mapData = topojson.feature(data, data.objects.COUNTY_MOI_1090820);
            mapData = topojson.feature(data, data.objects.COUNTY_MOI_1121110);
            taiwanMapData.value = mapData.features;
            mapSelectClass = `.city`;
            choosedZoneMapData = mapData.features;
        } else if (level === "city") {
            mapData = topojson.feature(data, data.objects.TOWN_MOI_1121110);
            choosedZoneMapData = mapData.features.filter(
                (district) => district.properties.COUNTYNAME === zone
                );
                cityMapData.value = choosedZoneMapData;
                mapSelectClass = `.district [data-city=${zone}]`;
            } else if (level === "district") {
                mapData = topojson.feature(data,data.objects.VILLAGE_NLSC_121_1120928);
                // mapData = gbify.toWGS84(map)
            choosedZoneMapData = mapData.features.filter(
                (village) => village.properties.TOWNNAME === zone
            );
            console.log(choosedZoneMapData);
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
                .attr("style", "opacity:1")
                .on("click", mapZoom);
            if (level !== "nation") {
                d3map
                    .selectAll(`#nation-map .${level}`)
                    .attr("style", "opacity:0;visibilty:hidden");
            }
        });
        //事件綁定
        // counties;

        //點擊縮放區域
        const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

        function zoomed(event) {
            const { transform } = event;
            d3map.attr("transform", transform);
            d3map.attr("stroke-width", 1 / transform.k);
        }

        function mapZoom(event, d) {
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            let targetWidth = x1-x0
            let targetHeight = y1-y0
            const scale = Math.min(mapWidth.value/(targetWidth), mapHeight.value/(targetHeight))*0.8
            svgScale.value = scale
            // const scale = 1;
            // event.stopPropagation();
            d3.select(this).transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(-x0-targetWidth/2+(mapWidth.value/2), -y0-targetHeight/2+(mapHeight.value/2)),
                    // .scale(scale),
                d3.pointer(event, d3map.node())
            );
        }

        d3map.call(zoom);
    }
}

//點擊區域顯示投票結果
function showDistrictOrVilla(ZoneProperties) {
    console.log(ZoneProperties);
    if (!ZoneProperties.TOWNNAME) {
        getMap("city", ZoneProperties.COUNTYNAME);
    } else if (ZoneProperties.TOWNNAME) {
        getMap("district", ZoneProperties.TOWNNAME);
    }
}

onMounted(() => {
    getMap();
});
</script>

<template>
    <Header/>
    <div class="vote-page">
        <SideMenu />
        <div class="map" :style="`width:${mapWidth}px;height:${mapHeight}px`">
            <svg ref="mapRef" :style="`transform:scale(${svgScale})`">
                <g id="nation-map">
                    <g class="city" v-for="city in taiwanMapData" :id="city.properties.COUNTYNAME" :key="city.properties.COUNTYCODE" @click="showDistrictOrVilla(city.properties)">
                        <title>{{ city.properties.COUNTYENG }}</title>
                    </g>
                    <g class="district">
                        <g v-for="district in cityMapData" :key="district.properties.TOWNCODE" :id="district.properties.TOWNNAME" :data-city="district.properties.COUNTYNAME" @click="showDistrictOrVilla(district.properties)">
                            <title>{{ district.properties.TOWNNAME }}</title>
                        </g>
                    </g>
                    <g class="village">
                        <g v-for="village in districtMapData" :key="village.properties.VILLCODE" :id="village.properties.VILLNAME" :data-district="village.properties.TOWNNAME">
                            <title>{{ village.properties.VILLNAME }}</title>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
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
    <Footer/>
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

.map {
    border: 1px solid #000;
    position: relative;

    &>svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    #nation-map {
        display: block;
        height: 100%;
        width: 100%;
    }

    &::before {
        content: "";
        display: block;
        width: 2px;
        height: 2px;
        background-color: red;
        position: absolute;
        bottom: 50%;
        right: 50%;
        z-index: 2;
    }
}

.city,
.village>g {
    stroke: $bg;
    stroke-width: 0.5;
    fill: $green;
    transition: 0.5s;

    &:hover {
        fill: $blue-d;
        cursor: pointer;
    }
}

.district {
    stroke: $bg;
    stroke-width: 0.5;
    fill: $blue-l;
    transition: 0.5s;
}
</style>
