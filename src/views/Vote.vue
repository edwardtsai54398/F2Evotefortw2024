<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as d3 from 'd3'
import VoteBar from "@/components/VoteBar.vue";
const datas = [
  {
    name: "taipei",
    vote: {
      "民進黨": 1000000,
      "國民黨": 54515,
      "民眾黨": 850000,
    },
  },
  {
    name: "taichung",
    vote: {
      "民進黨": 200000,
      "國民黨": 60000,
      "民眾黨": 450000,
    },
  },
]
const count = ref(0)
// d3.csv.parse('./public/2020_presedent/總統-A05-1-候選人得票數一覽表(中　央).csv').then((data)=>{
//   console.log(data);
// })
//畫台灣地圖
function drawMap(el, data) {
  const d3map = d3.select(el)
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

    const country = topojson.feature(data, data.objects.COUNTY_MOI_1090820);
    let projection = d3.geoMercator().center([122.3, 24]).scale(scale);
    let path = d3.geoPath();

    const counties = d3map
        .selectAll("path")
        .data(country.features)
        .join("g")
        .attr("id", (d) => d.properties.COUNTYNAME)
        .classed("county", true);

    counties.append("title").text((d) => d.properties.COUNTYNAME);
    counties.append("path").attr("d", path.projection(projection));
    //事件綁定
    counties.on("click", mapZoom);

    //點擊縮放區域
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

    function zoomed(event) {
        const { transform } = event;
        console.log(transform);
        d3map.attr("transform", transform);
        d3map.attr("stroke-width", 1 / transform.k);
    }

    function mapZoom(event, d) {
        const coutyElement = document.getElementById(d.properties.COUNTYNAME)
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        const width = 500;
        const height = 650;
        // const scale = Math.min(width/(x1 - x0), height/(y1 - y0))*0.8
        const scale = 2
        console.log('x0:', x0);
        console.log('y0:', y0);
        // event.stopPropagation();
        d3.select(this)
            .transition()
            .duration(750)
            .call(
                zoom.transform,
                d3.zoomIdentity
                // .translate(width / 2, height / 2)
                .scale(scale),
                d3.pointer(event, d3map.node())
            );
    }

    d3map.call(zoom);
}

onMounted(() => {
    d3.json("public/tw_map/nation/COUNTY_MOI_1090820.json").then((data) => {
        drawMap(".map svg", data);
    });
});

</script>

<template>
  <h2>歷史開票</h2>
  <div class="map"></div>
  <div v-for="data in datas" :key="data.name">
          <VoteBar :data="data"/>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/all.scss";
.d-flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.map{
  // overflow: hidden;
  height: 650px;
  width: 500px;
  border: 1px solid #000;
  position: relative;
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  &::before{
    content: '';
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
    stroke: #000;
    stroke-width: 0.2;
    fill: rgb(90, 229, 175);
    &:hover {
        fill: rgb(90, 166, 229);
        cursor: pointer;
    }
    &.active {
        fill: red;
        &:hover {
            fill: red;
        }
    }
}
</style>