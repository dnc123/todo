<script setup>
import { reactive, computed } from "vue";
import { useDataStore } from "@/stores/useDataStore";
import SelectAuthor from "./SelectAuthor.vue";

const dataStore = useDataStore();

const taskInsertForm = reactive({
  title: "",
  authorId: "",
});

const resetTaskInsertForm = () => {
  taskInsertForm.title = "";
  taskInsertForm.authorId = "";
};

const isFormFilled = computed(() => {
  return !!(taskInsertForm.authorId && taskInsertForm.title);
});

const insertTask = async () => {
  await dataStore.insertTask(taskInsertForm);
  resetTaskInsertForm();
};
</script>

<template>
  <form class="bg-gray-100 p-4 rounded" @submit.prevent="insertTask">
    <div class="mb-2">
      I want to create a new task which I will name
      <input
        v-model="taskInsertForm.title"
        placeholder="Title..."
        type="text"
        class="border px-4 py-2 rounded"
      />
    </div>

    <div class="mb-2">
      The task should be done by

      <SelectAuthor v-model="taskInsertForm.authorId" />
    </div>

    <button
      :disabled="!isFormFilled"
      :class="{
        'bg-blue-500 hover:bg-blue-700': isFormFilled,
        'bg-gray-400': !isFormFilled,
      }"
      class="text-white font-bold py-2 px-4 rounded duration-200"
    >
      Insert
    </button>
  </form>
</template>
