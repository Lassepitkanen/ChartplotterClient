<template>
  <div id="container">
    <div id="depth">{{chartData[chartData.length - 1]}}</div>
    <trend id="trend" :data="chartData" :gradient="['#ee3e32', '#fbb021', '#1b8a5a', '#1d4877']" :stroke-width="4" auto-draw smooth :radius="5" :max="4" :min="1.5" :auto-draw-duration="0"></trend>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChartContainer',
  computed: {
    ...mapGetters(['chartData'])
  }
}
</script>

<style scoped>
#container {
  background-color: black;
}

#depth {
  font-size: 40px;
  margin-left: 5px;
  color: red;
  position: absolute;
}

#trend {
  height: 100%;
  float: left;
  width: 100%;
}
</style>