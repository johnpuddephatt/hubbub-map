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
    <div
      class="fixed text-center tracking-wide text-sm transform -translate-x-1/2 bottom-4 left-1/2 z-[9999]"
    >
      <a class="uppercase" target="_blank" href="https://www.hubbub.org.uk/">
        <svg
          class="block w-64 h-auto mb-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="31 183 350 68"
        >
          <path
            fill="#000"
            d="M95.5 183h-1.4v31.9h1.4V183zM94.1 234c0 2.4.6 4.7 1.4 6.8v-21.7h-1.4V234zM128.6 183h-1.4v31.9h1.4V183zM127.1 240.8c.9-2.1 1.4-4.4 1.4-6.8v-14.9h-1.4v21.7zM109.7 183h-1.4v31.9h1.4V183zM108.3 250.7v.3h1.4v-31.9h-1.4v31.6zM103.6 249.2c.4.3 1 .4 1.4.7v-30.7h-1.4v30zM105 183h-1.4v31.9h1.4V183zM100.3 183h-1.4v31.9h1.4V183zM98.8 245.8c.4.4.9 1 1.4 1.4v-28.1h-1.4v26.7zM114.5 183H113v31.9h1.4V183h.1zM113 251h1.4v-31.9H113V251zM119.1 183h-1.4v31.9h1.4V183zM117.6 249.9c.4-.1 1-.4 1.4-.7v-30h-1.4v30.7zM122.4 247c.6-.4 1-.8 1.4-1.4v-26.5h-1.4V247zM123.8 183h-1.4v31.9h1.4V183zM32.4 183H31v31.9h1.4V183zM32.4 219.1H31v31.7h1.4v-31.7zM65.5 219.1H64v31.7h1.4l.1-31.7zM65.5 183H64v31.9h1.4l.1-31.9zM46.7 183h-1.4v31.9h1.4V183zM46.7 219.1h-1.4v31.7h1.4v-31.7zM41.9 219.1h-1.4v31.7h1.4v-31.7zM41.9 183h-1.4v31.9h1.4V183zM37.2 219.1h-1.4v31.7h1.4v-31.7zM37.2 183h-1.4v31.9h1.4V183zM51.3 219.1h-1.4v31.7h1.4v-31.7zM51.3 183h-1.4v31.9h1.4V183zM56 219.1h-1.4v31.7H56v-31.7zM56 183h-1.4v31.9H56V183zM60.7 183h-1.4v31.9h1.4V183zM60.7 219.1h-1.4v31.7h1.4v-31.7zM158.6 219.1h-1.4v31.7h1.4v-31.7zM158.6 183h-1.4v31.9h1.4V183zM190.2 193.2v13.6c.9-2.1 1.4-4.4 1.4-6.8s-.4-4.7-1.4-6.8zM190.2 240.8c.9-2.1 1.4-4.4 1.4-6.8s-.6-4.7-1.4-6.8v13.6zM171.4 250.7v.3h1.4v-31.9h-1.4v31.6zM172.8 183.1v-.1h-1.4v31.9h1.4v-31.8zM168.1 183h-1.4v31.9h1.4V183zM168.1 219.1h-1.4v31.7h1.4v-31.7zM163.3 219.1h-1.4v31.7h1.4v-31.7zM163.3 183h-1.4v31.9h1.4V183zM177.6 183.3v-.3h-1.4v31.8h1.4v-31.5zM176.1 251h1.4v-31.9h-1.4V251zM182.3 184.8c-.4-.3-1-.4-1.4-.7v30.6h1.4v-29.9zM180.9 249.9c.4-.1 1-.4 1.4-.7v-30h-1.4v30.7zM187 188.4c-.4-.4-.9-1-1.4-1.4v26c.6-.4 1-.9 1.4-1.4v-23.2zM185.6 247c.6-.4 1-.8 1.4-1.4v-23.2c-.4-.4-.9-1-1.4-1.4v26zM283.4 234c0 2.4.6 4.7 1.4 6.8v-21.7h-1.4V234zM284.9 183h-1.4v31.9h1.4V183zM317.9 183h-1.4v31.9h1.4V183zM316.5 240.8c.9-2.1 1.4-4.4 1.4-6.8v-14.9h-1.4v21.7zM299 183h-1.4v31.9h1.4V183zM297.5 250.7v.3h1.4v-31.9h-1.4v31.6zM294.4 183H293v31.9h1.4V183zM292.9 249.2c.4.3 1 .4 1.4.7v-30.7h-1.4v30zM289.6 183h-1.4v31.9h1.4V183zM288.2 245.8c.4.4.9 1 1.4 1.4v-28.1h-1.4v26.7zM302.3 251h1.4v-31.9h-1.4V251zM303.7 183h-1.4v31.9h1.4V183zM308.4 183H307v31.9h1.4V183zM307 249.9c.4-.1 1-.4 1.4-.7v-30H307v30.7zM313.2 183h-1.4v31.9h1.4V183zM311.7 247c.6-.4 1-.8 1.4-1.4v-26.5h-1.4V247zM348 183h-1.4v31.9h1.4V183zM348 219.1h-1.4v31.7h1.4v-31.7zM379.6 193.2v13.6c.9-2.1 1.4-4.4 1.4-6.8s-.6-4.7-1.4-6.8zM379.6 240.8c.9-2.1 1.4-4.4 1.4-6.8s-.6-4.7-1.4-6.8v13.6zM362.2 183.1v-.1h-1.4v31.9h1.4v-31.8zM360.7 250.7v.3h1.4v-31.9h-1.4v31.6zM357.4 183H356v31.9h1.4V183zM357.4 219.1H356v31.7h1.4v-31.7zM352.7 219.1h-1.4v31.7h1.4v-31.7zM352.7 183h-1.4v31.9h1.4V183zM366.8 183.3v-.3h-1.4v31.8h1.4v-31.5zM365.3 251h1.4v-31.9h-1.4V251zM371.5 184.8c-.4-.3-1-.4-1.4-.7v30.6h1.4v-29.9zM370.1 249.9c.4-.1 1-.4 1.4-.7v-30h-1.4v30.7zM376.3 188.4c-.4-.4-.9-1-1.4-1.4v26c.6-.4 1-.9 1.4-1.4v-23.2zM374.8 247c.6-.4 1-.8 1.4-1.4v-23.2c-.4-.4-.9-1-1.4-1.4v26zM221.8 183h-1.4v31.9h1.4V183zM221.8 219.1h-1.4v31.7h1.4v-31.7zM253.4 193.2v13.6c.9-2.1 1.4-4.4 1.4-6.8s-.5-4.7-1.4-6.8zM253.4 240.8c.9-2.1 1.4-4.4 1.4-6.8s-.6-4.7-1.4-6.8v13.6zM234.4 250.7v.3h1.4v-31.9h-1.4v31.6zM235.9 183.1v-.1h-1.4v31.9h1.4v-31.8zM231.1 219.1h-1.4v31.7h1.4v-31.7zM231.1 183h-1.4v31.9h1.4V183zM226.4 183H225v31.9h1.4V183zM226.4 219.1H225v31.7h1.4v-31.7zM239.2 251h1.4v-31.9h-1.4V251zM240.6 183.3v-.3h-1.4v31.8h1.4v-31.5zM245.4 184.8c-.4-.3-1-.4-1.4-.7v30.6h1.4v-29.9zM243.9 249.9c.4-.1 1-.4 1.4-.7v-30h-1.4v30.7zM250.1 188.4c-.4-.4-.9-1-1.4-1.4v26c.6-.4 1-.9 1.4-1.4v-23.2zM248.7 247c.6-.4 1-.8 1.4-1.4v-23.2c-.4-.4-.9-1-1.4-1.4v26z"
          />
        </svg>
        <p>www.hubbub.org.uk</p>
      </a>
    </div>
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
