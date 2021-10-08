<template>
  <div class="fixed top-0 left-16 w-[22rem] z-[999] h-screen py-16">
    <div
      class="max-h-full px-4 py-8 space-y-1 overflow-y-auto bg-white shadow-2xl rounded-3xl"
    >
      <h1
        class="mx-6 mb-4 text-2xl font-semibold leading-tight text-center text-hubbuborange"
        v-html="siteData.strapline"
      ></h1>
      <div
        @click="$emit('clicked', selectedCategory == key ? null : key)"
        class="flex flex-row items-center px-2 py-1 space-x-3 cursor-pointer hover:bg-gray-100 rounded-xl"
        :class="selectedCategory == key ? 'bg-gray-100' : ''"
        v-for="(category, key) in siteData.categories"
        :key="category.circularIcon"
      >
        <img
          class="flex-none w-14 h-14"
          :src="`/assets/images/${category.circularIcon}`"
        />
        <div>
          <h3 class="font-bold leading-tight">{{ key }}</h3>
          <p class="leading-tight">{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  props: ["selectedCategory", "entries", "siteData", "isLandscape"],
  components: {},
  data() {
    return {
      selected: "",
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss">
h1 strong {
  display: block;
  font-weight: 900;
}
</style>
