import { createStore } from 'vuex'

export default createStore({
    state: {
        allData: [],
        taiwanResults: {},
    },
    getters: {
    },
    mutations: {
        setAllData(state, data) {
            state.allData = data;
        },
        setTaiwanResults(state, data) {
            const sum = data[0].vote["民進黨"] + data[0].vote["國民黨"] + data[0].vote["親民黨"];
            state.taiwanResults = {
                green: Math.round((data[0].vote["民進黨"] / sum).toFixed(2) * 100),
                blue: Math.round((data[0].vote["國民黨"] / sum).toFixed(2) * 100),
                orange: Math.round((data[0].vote["親民黨"] / sum).toFixed(2) * 100),
            };
        }
    },
    actions: {
        filterData({ commit }, data) {
            let newData = [];
            data.forEach((item) => {
                newData.push({
                    name: item["行政區別"],
                    vote: {
                        "民進黨": parseInt(item["民進黨"].replaceAll(",", "")),
                        "國民黨": parseInt(item["國民黨"].replaceAll(",", "")),
                        "親民黨": parseInt(item["親民黨"].replaceAll(",", "")),
                    }
                })
            })
            const all = newData.splice(0, 1);
            commit("setAllData", newData);
            commit("setTaiwanResults", all);
        },
        fetchData({ dispatch}, file) {
            fetch(`/json/${file}.json`)
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
