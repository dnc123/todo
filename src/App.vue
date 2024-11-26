<script setup>
import TaskList from "./components/TaskList.vue";
import { useDataStore } from "./stores/useDataStore";
import TaskInsertForm from "./components/TaskInsertForm.vue";
import TaskFilters from "./components/TaskFilters.vue";

const dataStore = useDataStore();

dataStore.loadData();
</script>

<template>
  <main class="p-8 max-w-[800px] mx-auto">
    <TaskInsertForm class="mb-12" />

    <div class="flex justify-end">
      <TaskFilters class="mb-2" />
    </div>

    <TaskList />
  </main>
</template>
