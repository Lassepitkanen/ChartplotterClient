import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: null,
    chartData: [],
    mapData: [],
  },
  getters: {
    map: state => state.map,
    chartData: state => state.chartData,
    mapData: state => state.mapData,
  },
  actions: {
    setMap(context, map) {
      context.commit('setMap', map);
    },
    addChartData(context, number) {
      context.commit('addChartData', number);
    },
    setMapData(context, mapData) {
      context.commit('setMapData', mapData)
    }
  },
  mutations: {
    setMap(state, map) {
      if (map) {
        state.map = map;
      } 
    },
    addChartData(state, number) {
      state.chartData.push(number);
      if (state.chartData.length > 19) {
        state.chartData.shift();
      }
    },
    setMapData(state, mapData) {
      state.mapData = mapData;
    }
  },
})
