<template>
  <multiselect v-model="selected" :options="dataOptions" @input="onDataSelected" :showLabels="false"></multiselect>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DataSelect',
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    ...mapActions(['setMapData']),

    onDataSelected: function(selected) {
      switch (selected) {
        case 'Turtola':
          import('../data/turtola.js').then(modul => {
            this.setMapData(modul.data);
          });
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.dataOptions = ['Turtola'];
  }
}
</script>

<style>

</style>
