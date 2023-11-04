<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import VoteBar from "@/components/VoteBar.vue";
const datas = [
    {
        name: "taipei",
        vote: {
            民進黨: 1000000,
            國民黨: 54515,
            民眾黨: 850000,
        },
    },
    {
        name: "taichung",
        vote: {
            民進黨: 200000,
            國民黨: 60000,
            民眾黨: 450000,
        },
    },
];

const taiwanMapData = ref([]);
const cityMapData = ref([]);
const districtMapData = ref([]);

//抓台灣地圖資料
function getMap(level = "nation", zone = "nation") {
    let file = "";
    if (level === "nation") {
        file = "nation/COUNTY_MOI_1090820.json";
    } else if (level === "city") {
        file = "city/TOWN_MOI_1120825.json";
    }

    d3.json(`public/tw_map/${file}`).then((data) => {
        drawMap("#nation-map", data);
    });

    //畫台灣地圖
    let scale = 5500;
    let wWidth = window.innerWidth;
    if (wWidth >= 1280) {
        // scale = 5500
        scale = 9000;
    } else if (wWidth < 1280 && wWidth >= 768) {
        scale = 7000;
    } else if (wWidth < 768) {
        scale = 5500;
    }

    // let mapWidth = 500
    // let mapHeight = 650
    let projection = d3.geoMercator().center([122.3, 24]).scale(scale);
    let path = d3.geoPath();

    function drawMap(el, data) {
        const d3map = d3.select(el);
        let mapData;
        let mapSelectClass;
        let choosedZoneMapData = [];
        if (level === "nation") {
            mapData = topojson.feature(data, data.objects.COUNTY_MOI_1090820);
            taiwanMapData.value = mapData.features;
            mapSelectClass = `.county`;
            choosedZoneMapData = mapData.features;
            console.log(choosedZoneMapData);
        } else if (level === "city") {
            mapData = topojson.feature(data, data.objects.TOWN_MOI_1120825);
            choosedZoneMapData = mapData.features.filter(
                (district) => district.properties.COUNTYNAME === zone
            );
            cityMapData.value = choosedZoneMapData;
            mapSelectClass = `.district [data-city=${zone}]`;
        }

        nextTick(() => {

            d3map
                .selectAll(mapSelectClass)
                .data(choosedZoneMapData)
                .join("g")
                .append("path")
                .attr("d", path.projection(projection))
                .on("click", mapZoom);
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

            // const scale = Math.min(width/(x1 - x0), height/(y1 - y0))*0.8
            const scale = 1;
            // event.stopPropagation();
            d3.select(this).transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    // .translate(mapWidth / 2, mapHeight / 2)
                    .scale(scale),
                d3.pointer(event, d3map.node())
            );
        }

        d3map.call(zoom);
    }
}

//點擊區域顯示投票結果
function showDistrictOrVilla(ZoneProperties) {
    if(ZoneProperties.COUNTYNAME && !ZoneProperties.TOWNNAME){
        getMap("city", ZoneProperties.COUNTYNAME);
    }
}

onMounted(() => {
    getMap("nation");
});
</script>

<template>
    <h2>歷史開票</h2>
    <div class="map">
        <svg ref="mapRef">
            <g id="nation-map">
                <g
                    class="county"
                    v-for="city in taiwanMapData"
                    :id="city.properties.COUNTYNAME"
                    :key="city.properties.COUNTYCODE"
                    @click="showDistrictOrVilla(city.properties)"
                >
                    <title>{{ city.properties.COUNTYNAME }}</title>
                </g>
                <g class="district">
                    <g
                        v-for="district in cityMapData"
                        :key="district.properties.TOWNCODE"
                        :id="district.properties.TOWNNAME"
                        :data-city="district.properties.COUNTYNAME"
                    >
                        <title>{{ district.properties.TOWNNAME }}</title>
                    </g>
                </g>
                <g class="village">
                    <g></g>
                </g>
            </g>
        </svg>
    </div>
    <div v-for="data in datas" :key="data.name">
        <VoteBar :data="data" />
    </div>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";
.d-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
.map {
    // overflow: hidden;
    height: 650px;
    width: 500px;
    border: 1px solid #000;
    position: relative;
    & > svg {
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
.county {
    stroke: $bg;
    stroke-width: 0.5;
    fill: $green;
    &:hover {
        fill: $blue-d;
        cursor: pointer;
    }
    
}
.district {
    stroke: $bg;
    stroke-width: 0.5;
    fill: $blue-l;
}
</style>
