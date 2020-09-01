<template>
  <div>
    <multiselect v-model="selected" :options="zoomOptions" @input="onZoomSelected" :showLabels="false"></multiselect>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapGetters(['map'])
  },
  methods: {
    onZoomSelected: function() {
      this.map.setZoom(this.selected);
    }
  },
  created() {
    this.zoomOptions = [15, 16, 17, 18];
  }
}
</script>

<style>

</style>
