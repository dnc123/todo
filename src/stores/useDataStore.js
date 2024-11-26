import { defineStore } from "pinia";
import axios from "axios";
import { TASK_STATUS_TODO } from "@/constants";
import { getCurrentDateFormatted } from "@/utils/getCurrentDateFormatted";
import { insertTask } from "@/api/insertTask";

export const useDataStore = defineStore("data", {
  state: () => ({
    isLoadingData: false,

    data: {
      authors: [],
      columns: [],
      tasks: [],
    },

    filters: {
      search: undefined,
      authorId: undefined,
    },
  }),

  getters: {
    columns: (state) => {
      return state.data?.columns || [];
    },

    tasks: (state) => {
      const tasks = state.data?.tasks || [];

      const mappedTasks = tasks.map((task) => {
        const author = state.authors.find(({ id }) => {
          return id === task.author_id;
        });

        return {
          ...task,
          author,
        };
      });

      const filteredTasks = mappedTasks.filter((task) => {
        if (
          state.filters.search &&
          !task.title.toLowerCase().includes(state.filters.search)
        ) {
          return false;
        }

        if (
          state.filters.authorId &&
          task.author_id !== state.filters.authorId
        ) {
          return false;
        }

        return true;
      });

      return filteredTasks;
    },

    authors: (state) => {
      return state.data?.authors || [];
    },
  },

  actions: {
    async insertTask({ title, authorId }) {
      try {
        await insertTask(); // empty function to simulate task upload

        this.data.tasks.unshift({
          id: Math.random(), // Should come from back-end, so I just mock it here
          title,
          author_id: authorId,
          current_column: TASK_STATUS_TODO,
          date_created: getCurrentDateFormatted(),
        });
      } catch (error) {
        console.error("Unhandled error trying to insert task");
      }
    },

    async loadData() {
      if (this.isLoadingData) {
        return;
      }

      this.isLoadingData = true;

      try {
        const dataLoadResponse = await axios.get("/data.json");

        this.data = dataLoadResponse.data;
      } catch (error) {
        console.error("There was a problem loading data");
      }

      this.isLoadingData = false;
    },
  },
});
