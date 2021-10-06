<template>
  <div
    v-if="entriesLoaded && siteDataLoaded"
    class="w-screen h-screen font-sans"
  >
    <Legend
      @clicked="selectedCategory = $event"
      :siteData="siteData"
      :selectedCategory="selectedCategory"
    />
    <Map
      class="font-sans"
      :isLandscape="isLandscape()"
      :entries="entries"
      :categories="siteData.categories"
      :selectedCategory="selectedCategory"
    />
  </div>
</template>

<script>
import Map from "./Map.vue";
import Legend from "./Legend.vue";

export default {
  name: "Overview",
  props: [],
  components: {
    Legend,
    Map,
  },
  data() {
    return {
      entries: [],
      errored: false,
      entriesLoaded: false,
      siteDataLoaded: false,
      siteData: {},
      selectedCategory: null,
    };
  },
  watch: {},
  methods: {
    isLandscape() {
      return (
        document.documentElement.clientWidth >
        document.documentElement.clientHeight
      );
    },
  },
  mounted() {
    axios
      .get("/api/all.json")
      .then((response) => {
        this.entries = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.entriesLoaded = true));

    axios
      .get("/api/site.json")
      .then((response) => {
        this.siteData = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.siteDataLoaded = true));
  },
};
</script>

<style lang="scss"></style>
