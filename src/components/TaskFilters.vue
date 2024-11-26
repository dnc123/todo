<script setup>
import SelectAuthor from "./SelectAuthor.vue";
import { useDataStore } from "@/stores/useDataStore";

const dataStore = useDataStore();
</script>

<template>
  <div class="inline-flex gap-4">
    <SelectAuthor v-model="dataStore.filters.authorId" is-paginated />

    <input
      v-model="dataStore.filters.search"
      type="text"
      placeholder="Search..."
      class="border px-4 py-2 rounded"
    />
  </div>
</template>
