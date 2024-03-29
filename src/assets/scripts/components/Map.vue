<template>
  <l-map
    id="map"
    ref="map"
    :zoom.sync="zoom"
    :center="center"
    :options="mapOptions"
    :minZoom="minZoom"
    :maxZoom="maxZoom"
    :inertia="true"
    :zoomAnimation="true"
    :noBlockingAnimations="true"
  >
    <div
      title="Reset map view"
      @click="resetMap"
      class="cursor-pointer fixed z-[9999] top-4 right-4 p-1 bg-gray-50 shadow rounded border-2 border-opacity-30 border-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="22" y1="12" x2="18" y2="12"></line>
          <line x1="6" y1="12" x2="2" y2="12"></line>
          <line x1="12" y1="6" x2="12" y2="2"></line>
          <line x1="12" y1="22" x2="12" y2="18"></line>
        </g>
      </svg>
    </div>
    <l-control-zoom :position="isLandscape ? 'bottomright' : 'topright'" />
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-tile-layer v-if="zoom >= 10" :url="url2" :attribution="attribution" />
    <v-icondefault :image-path="'/assets/images/'"></v-icondefault>
    <v-marker-cluster
      v-for="category in categorisedEntries"
      :key="category.key"
      :options="getClusterOptions(category.key)"
    >
      <l-marker
        :ref="entry.id"
        v-for="entry in category.values"
        :key="entry.id"
        :lat-lng="getLatLng(entry)"
        @click="selectedEntryID = entry.id"
        @keyup.enter="markerClicked(entry.id)"
      >
        <l-popup
          :ref="`popup-${entry.id}`"
          class="flex flex-row bg-white clip-path-2"
          :options="{
            maxWidth: 450,
            minWidth: 450,
            offset: [0, -20],
            closeButton: false,
            className: '',
          }"
        >
          <div class="relative flex-none w-1/3 clip-path-3">
            <img
              :src="`/assets/images/${categories[category.key].squareIcon}`"
              class="absolute inset-0 object-cover object-center w-full h-full"
            />
          </div>
          <div class="py-6 pl-5 pr-10">
            <h3 class="text-2xl font-extrabold leading-tight ">
              {{ category.key }}
            </h3>
            <p class="!my-0 leading-tight text-2xl font-medium text-gray-800">
              {{ categories[category.key].description }}
            </p>
            <p
              class="pt-2 pb-4 text-xs text-gray-800 font-medium tracking-wide !my-0 uppercase"
            >
              <svg
                class="-mt-0.5 inline-block w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50.9 55.9"
              >
                <path
                  d="M40.8 6.2c-8-8.2-21.1-8.4-29.3-.4l-.4.4c-3.9 4-6.1 9.4-6.1 15 0 8.4 7.8 19.5 14.5 29.1v.2l3 3.8c1.4 1.9 4.1 2.3 6 .9.3-.2.6-.5.9-.9l3-4c6.7-9.5 14.5-20.7 14.5-29 0-5.6-2.2-11-6.1-15.1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  :fill="categories[category.key].color"
                />
                <circle
                  cx="25.6"
                  cy="19.9"
                  r="7.5"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="#fff"
                />
              </svg>
              {{ entry.address.replace(", UK", "") }}
            </p>
            <p class="text-base !my-0 text-gray-500">{{ entry.description }}</p>
          </div>
        </l-popup>
        <l-icon
          :iconAnchor="selectedEntryID == entry.id ? [30, 82] : [16, 40]"
          :popupAnchor="[0, -35]"
          :iconSize="selectedEntryID == entry.id ? [61, 82] : [32, 40]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.76 314.03">
            <path
              fill="#000000"
              d="M120.03.02S2.45-2.75.03 122.02c-2 101.11 105.2 190.34 120 192 13.35 1.49 119.52-98 117.71-192.16C235.34-3.65 120.03.02 120.03.02z"
            />
            <circle
              cx="118.88"
              cy="121.86"
              r="95"
              :fill="categories[category.key].color"
            />
          </svg>
        </l-icon>
      </l-marker>
    </v-marker-cluster>
  </l-map>
</template>

<script>
import L from "leaflet";
import { divIcon as DivIcon, point as Point } from "leaflet";
import { latLng } from "leaflet";
import {
  LIconDefault,
  LPopup,
  LIcon,
  LMap,
  LTileLayer,
  LMarker,
  LControlZoom,
} from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  name: "Map",
  props: ["selectedCategory", "entries", "categories", "isLandscape"],
  components: {
    "v-icondefault": LIconDefault,
    LPopup,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LControlZoom,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
  },
  data() {
    return {
      options: {
        useEasing: true,
        useGrouping: true,
      },
      selectedEntryID: null,
      zoom: 6,
      minZoom: 6,
      center: latLng(54.2274815, -4.8523105),
      url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
      url2: 'https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.png',
      maxZoom: 13,
      attribution:
        'Tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      mapOptions: {
        scrollWheelZoom: window.self == window.top,
        zoomSnap: 0.5,
        zoomControl: false,
        zoomAnimationThreshold: 8,
      },
    };
  },
  computed: {
    categorisedEntries() {
      if (this.selectedCategory) {
        return [
          {
            key: this.selectedCategory,
            values: this.entries.filter((elem) => {
              return elem.category == this.selectedCategory;
            }),
          },
        ];
      } else {
        return this.groupBy(this.entries, "category");
      }
    },
  },
  mounted() {
    this.$refs.map.mapObject.on(
      "popupclose",
      () => (this.selectedEntryID = null)
    );
  },
  watch: {
    categorisedEntries() {
      console.log("categorised entries changed");

      if (this.categorisedEntries.length == 1) {
        this.$refs.map.mapObject.fitBounds(
          this.categorisedEntries[0].values.map((elem) => {
            return this.getLatLng(elem);
          }),
          { padding: L.point(50, 50), maxZoom: 9 }
        );
      } else {
        this.resetMap();
      }

      // this.$refs.map.mapObject.map.fitBounds(
      //   //
      // )
    },
  },
  methods: {
    resetMap() {
      this.$refs.map.mapObject.flyTo(this.center, this.minZoom);
      this.$refs.map.mapObject.once("zoomend", () => {
        this.$emit("reset");
      });
    },
    getLatLng(entry) {
      let latLngArray = [
        parseFloat(entry.latitude),
        parseFloat(entry.longitude),
      ];
      return latLngArray;
    },

    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
          el.values.push(x);
        } else {
          rv.push({ key: v, values: [x] });
        }
        return rv;
      }, []);
    },

    getClusterOptions(category) {
      return {
        disableClusteringAtZoom: this.maxZoom,
        spiderLegPolylineOptions: {
          weight: 6,
          color: this.categories[category].color,
          opacity: 0.75,
        },
        iconCreateFunction: (cluster) => {
          var childCount = cluster.getChildCount();

          return new DivIcon({
            html: `<div class="relative"><span class="absolute block w-full h-5 mt-1.5 font-bold leading-relaxed text-center text-white">${childCount}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.76 314.03">
          <path
            fill="#000000"
            d="M120.03.02S2.45-2.75.03 122.02c-2 101.11 105.2 190.34 120 192 13.35 1.49 119.52-98 117.71-192.16C235.34-3.65 120.03.02 120.03.02z"
          />
          <circle
            cx="118.88"
            cy="121.86"
            r="97.98"
            fill="${this.categories[category].color}"
          />
        </svg></div>`,
            className: "",
            iconSize: new Point(32, 40),
            iconAnchor: new Point(16, 40),
          });
        },
      };
    },
  },
};
</script>

<style lang="scss">
.leaflet-popup-content-wrapper {
  @apply bg-transparent text-black rounded-none shadow-none;
}

.leaflet-popup-tip-container {
  @apply hidden;
}

.leaflet-tile-pane {
  opacity: 0.65;
}
</style>
