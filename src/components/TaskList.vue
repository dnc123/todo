<script setup>
import { useDataStore } from "@/stores/useDataStore";
import TaskItem from "./TaskItem.vue";
import { ref, watch } from "vue";
import Draggable from "vuedraggable";
import {
  TASK_STATUS_APPROVED,
  TASK_STATUS_DONE,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_TODO,
} from "@/constants";

const dataStore = useDataStore();
const columnToTasksMap = ref({});

const loadColumnToTasksMap = () => {
  const map = {
    [TASK_STATUS_APPROVED]: [],
    [TASK_STATUS_DONE]: [],
    [TASK_STATUS_IN_PROGRESS]: [],
    [TASK_STATUS_TODO]: [],
  };

  dataStore.tasks.forEach((task) => {
    if (!map[task.current_column]) {
      map[task.current_column] = [];
    }

    map[task.current_column].push(task);
  });

  columnToTasksMap.value = map;
};

watch(() => dataStore.tasks, loadColumnToTasksMap);
loadColumnToTasksMap();
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="column in dataStore.columns" :key="column">
        <p class="mb-4 text-center font-bold text-lg">{{ column }}</p>

        <div class="space-y-4">
          <Draggable
            v-model="columnToTasksMap[column]"
            group="tasks"
            class="space-y-4 min-h-20"
            item-key="id"
          >
            <template #item="{ element }">
              <TaskItem :task="element" />
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </div>
</template>
