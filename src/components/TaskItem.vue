<script setup>
import { defineProps } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="p-4 border rounded hover:bg-gray-100 duration-100 cursor-pointer">
    <p class="mb-2">{{ props.task.title }}</p>

    <p class="text-end font-bold italic">
      {{ props.task.author.display_name }}
    </p>
  </div>
</template>
