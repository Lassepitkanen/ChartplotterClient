<template>
  <div>
    <button id="ws-button" @click="connectWS">WebSocket {{isWsConnected}}</button>
    <button id="chart-button" @click="onChart">Chart {{isChartEnabled}}</button>
    <button id="polyline-button" @click="onPolyline">Polyline {{isPolylineEnabled}}</button>
  </div>
</template>

<script>
/*global google*/
import { mapGetters, mapActions } from 'vuex';

const wsUrl = 'ws://192.168.1.130:8888/gps';
export default {
  name: 'WsHandler',
  data() {
    return {
      messageCount: 0,
      polyline: new google.maps.MVCArray(),
      isChartEnabled: false,
      isWsConnected: false,
      isPolylineEnabled: false,
    }
  },
  computed: {
    ...mapGetters(['map', 'mapData']),
  },
  methods: {
    ...mapActions(['addChartData']),

    connectWS: function() {
      const ws = new WebSocket(wsUrl);
      ws.onopen = () => {
        this.isWsConnected = true;
      };
      ws.onclose = () => {
        this.isWsConnected = false;
      };

      ws.onmessage = msg => {
        this.messageCount++;
        const response = JSON.parse(msg.data);
        const location = new google.maps.LatLng(response.lat, response.lng);
        if (this.isPolylineEnabled === true) {
          this.polyline.push(location);
        }

        if (!this.directionArrow) {
          this.directionArrow = new google.maps.Marker({
            map: this.map
          });
        }
        this.directionArrow.setPosition(location);
        this.directionArrow.setIcon({
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          strokeColor: '#0000FF',
          rotation: (response.angle + 180 + 20) % 360,
        });
        
        if (this.isChartEnabled === true && this.mapData) {
          this.getDepth(response.lat, response.lng);
        }
        if (this.messageCount === 5) {
          this.map.setCenter(location);
          this.messageCount = 0;
        }
      };
    },
    initPolyline: function() {
      const line = new google.maps.Polyline({
        path: this.polyline,
        strokeColor: '#ff0083',
        geodesic: true,
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      line.setMap(this.map);
    },
    getDepth: function(lat, lng) {
      const obj = this.mapData.find(el => el.lat === lat && el.lng === lng);
      if (obj !== void 0) {
        this.addChartData(obj.depth);
      }
    },
    onChart: function() {
      this.isChartEnabled = !this.isChartEnabled; 
    },
    onPolyline: function() {
      this.isPolylineEnabled = !this.isPolylineEnabled; 
    },
  },
  watch: {
    map() {
      if (this.map) {
        this.initPolyline();
        this.connectWS();
      }
    }
  },
}
</script>

<style>

</style>
