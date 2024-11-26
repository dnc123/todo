<script setup>
import SelectAuthorItem from "./SelectAuthorItem.vue";
import { useDataStore } from "@/stores/useDataStore";
import { defineProps, ref, computed, defineModel } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isPaginated: {
    type: Boolean,
    default: false,
  },
});

const AUTHOR_COUNT_PER_PAGE = 10;

const dataStore = useDataStore();

const selectedAuthorId = defineModel();
const paginatedAuthorsLimit = ref(AUTHOR_COUNT_PER_PAGE);
const isDropdownOpened = ref(false);

const dropdownMenu = ref();

onClickOutside(dropdownMenu, () => {
  isDropdownOpened.value = false;
});

const authors = computed(() => {
  if (!props.isPaginated) {
    return dataStore.authors;
  }

  return dataStore.authors.slice(0, paginatedAuthorsLimit.value);
});

const loadMoreAuthors = () => {
  paginatedAuthorsLimit.value += AUTHOR_COUNT_PER_PAGE;
};

const isAllAuthorsLoaded = computed(() => {
  return paginatedAuthorsLimit.value >= dataStore.authors.length;
});

const handleAuthorSelect = (selectedAuthor) => {
  selectedAuthorId.value = selectedAuthor.id;
  isDropdownOpened.value = false;
};

const selectedAuthor = computed(() => {
  return dataStore.authors.find(({ id }) => {
    return id === selectedAuthorId.value;
  });
});
</script>

<template>
  <div class="relative inline-block">
    <div
      @click="isDropdownOpened = true"
      class="cursor-pointer select-none bg-white border px-4 py-2 rounded"
    >
      {{ selectedAuthor?.display_name || "Select author" }}
    </div>

    <div
      ref="dropdownMenu"
      v-show="isDropdownOpened"
      class="absolute bg-white top-full max-h-40 left-0 z-10 overflow-y-scroll shadow-md"
    >
      <SelectAuthorItem
        v-if="selectedAuthor"
        @click="selectedAuthorId = undefined"
      >
        Deselect selected author
      </SelectAuthorItem>

      <SelectAuthorItem
        v-for="author in authors"
        :key="author.id"
        :value="author.id"
        @click="handleAuthorSelect(author)"
      >
        {{ author.display_name }}
      </SelectAuthorItem>

      <SelectAuthorItem
        v-if="!isAllAuthorsLoaded && props.isPaginated"
        @click="loadMoreAuthors"
      >
        Load more
      </SelectAuthorItem>
    </div>
  </div>
</template>
