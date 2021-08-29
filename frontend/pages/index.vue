<template>
  <div>
    <h2>Task App</h2>
    <h3>ADD_TASK</h3>
    <input type="text" v-model="content" />
    <button @click="createTask()">追加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

type TaskType = {
  content: string;
  isFinished: boolean;
};

export default defineComponent({
  setup() {
    // axios
    const { $axios } = useContext();

    // data
    const content = ref<string>('');
    const task = ref<TaskType>({
      content: content,
      isFinished: false,
    });

    // methods
    const createTask = async () => {
      window.location.href = 'http://localhost:3000';
      await $axios.$post('/api/tasks/store', {
        task: task.value,
      });
    };

    return {
      // data
      content,
      task,
      // methods
      createTask,
    };
  },
});
</script>