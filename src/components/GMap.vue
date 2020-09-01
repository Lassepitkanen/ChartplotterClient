<template>
  <div id="map"></div>
</template>

<script>
/*global google*/
import { mapActions, mapGetters } from 'vuex';

const latPolyOffset = 0.00001;
const lngPolyOffset = 0.000025;

export default {
  name: 'GMap',
  mounted() {
    this.initMap();
  },
  computed: {
    ...mapGetters(['map', 'mapData']),
  },
  methods: {
    ...mapActions(['setMap']),

    initMap: function() {
      const element = document.getElementById('map');
      const options = {
        zoom: 17,
        //center: { lat: data[0].lat, lng: data[0].lng },
        mapTypeId: 'satellite',
        disableDefaultUI: true
      }
      const map = new google.maps.Map(element, options);
      this.setMap(map);
    },
    drawPolygons: function() {
      const data = this.mapData;
      let len = data.length;
      let obj, rect, color, polygon;
      for (let i = 0; i < len; ++i) {
        obj = data[i];
        rect = [
          { lat: obj.lat - latPolyOffset, lng: obj.lng - lngPolyOffset },
          { lat: obj.lat - latPolyOffset, lng: obj.lng + lngPolyOffset },
          { lat: obj.lat + latPolyOffset, lng: obj.lng + lngPolyOffset },
          { lat: obj.lat + latPolyOffset, lng: obj.lng - lngPolyOffset },
        ];

        color = this.assignColor(obj.depth);
        polygon = new google.maps.Polygon({
          paths: rect,
          fillColor: color,
          fillOpacity: 0.5,
          strokeOpacity: 1,
          strokeWeight: 0,
        });
        polygon.setMap(this.map);
      }
    },
    assignColor(waterDepth) {
      if (waterDepth >= 5) {
        return '#440000';
      } else if (waterDepth >= 4.5) {
        return '#840000';
      } else if (waterDepth >= 4.0) {
        return '#c10000';
      } else if (waterDepth >= 3.5) {
        return '#ff0000';
      } else if (waterDepth >= 3.0) {
        return '#ff4300';
      } else if (waterDepth >= 2.5) {
        return '#ff7f00';
      } else if (waterDepth >= 2.0) {
        return '#ffbf00';
      } else if (waterDepth >= 1.5) {
        return '#ffff00';
      } else if (waterDepth >= 1.0) {
        return '#c3ff00';
      } else {
        return '#8cff00';
      }
    }
  },
  watch: {
    mapData() {
      if (this.mapData) {
        this.map.setCenter({ lat: this.mapData[0].lat, lng: this.mapData[0].lng });
        this.drawPolygons();
      }
    }
  },
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
