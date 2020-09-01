<template>
  <div id="app">
    <WsHandler/>
    <DataSelect style="width: 50%; float: left"/>
    <ZoomSelect style="width: 50%; float: right "/>
    <GMap style="height: 73vh"/>
    <ChartContainer style="height: 14vh"/>
  </div>
</template>

<script>
import GMap from './components/GMap.vue';
import WsHandler from './components/WsHandler.vue';
import ChartContainer from './components/ChartContainer.vue';
import DataSelect from './components/DataSelect.vue';
import ZoomSelect from './components/ZoomSelect.vue';

export default {
  name: 'app',
  components: {
    GMap,
    WsHandler,
    ChartContainer,
    DataSelect,
    ZoomSelect,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
