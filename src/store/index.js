import { createStore } from 'vuex'
import { findCountyIndex } from '../utils/method';

export default createStore({
    state: {
        allData: [],
        countyData: [],
        taiwanResults: {},
        isCity: false,
        countyStart: null,
        countyEnd: null,
        currentZone:{
            level: "nation",
            city: "",
            district: ""
        },
        currentYear: null,
    },
    getters: {
    },
    mutations: {
        setAllData(state, data) {
            state.allData = data;
        },
        setCountyData(state, data) {
            state.countyData = data;
        },
        setTaiwanResults(state, data) {
            const sum = data[0].vote["民進黨"] + data[0].vote["國民黨"] + data[0].vote["親民黨"];
            state.taiwanResults = {
                green: Math.round((data[0].vote["民進黨"] / sum).toFixed(2) * 100),
                blue: Math.round((data[0].vote["國民黨"] / sum).toFixed(2) * 100),
                orange: Math.round((data[0].vote["親民黨"] / sum).toFixed(2) * 100),
            };
        },
        setIsCity(state, data) {
            state.isCity = data;
        },
        setCountyStartEnd(state, data) {
            state.countyStart = data[0];
            state.countyEnd = data[1];
        },
        setCurrentZone(state, data){
            state.currentZone.level = data.level
            state.currentZone.city = data.city
            state.currentZone.district = data.district
        },
        setCurrentYear(state, year) {
            state.currentYear = year;
        }
    },
    actions: {
        filterData({ commit, state }, data) {
            let newData = [];
            if (state.isCity) {
                data.forEach((item) => {
                    newData.push({
                        name: item["行政區別"],
                        vote: {
                            "民進黨": parseInt(String(item["民進黨"]).replaceAll(",", "")),
                            "國民黨": parseInt(String(item["國民黨"]).replaceAll(",", "")),
                            "親民黨": parseInt(String(item["親民黨"]).replaceAll(",", "")),
                        }
                    })
                })
                commit("setCountyData", newData);
            } else {
                const indexArray = findCountyIndex(data, state.countyStart, state.countyEnd);
                const spliceData = data.splice(indexArray[0], indexArray[1]-indexArray[0]);
                spliceData.forEach((item) => {
                    newData.push({
                        name: item["村里別"],
                        vote: {
                            "民進黨": parseInt(String(item["民進黨"]).replaceAll(",", "")),
                            "國民黨": parseInt(String(item["國民黨"]).replaceAll(",", "")),
                            "親民黨": parseInt(String(item["親民黨"]).replaceAll(",", "")),
                        }
                    })
                })
            }
            const all = newData.splice(0, 1);
            commit("setAllData", newData);
            commit("setTaiwanResults", all);
        },
        fetchData({ dispatch, commit, state}, file) {
            commit("setIsCity", file.isCity);
            if (file?.county) {
                commit("setCountyStartEnd", file.county);
            }
            let url;
            if (state.isCity) {
                url = `/${state.currentYear}_president/city/`;
            } else {
                url = `/${state.currentYear}_president/district/`;
            }
            fetch(`${url}${file.fileName}.json`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    dispatch("filterData", data);
                })
        },

    },
    modules: {
    }
})
