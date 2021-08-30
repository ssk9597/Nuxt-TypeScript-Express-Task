<template>
  <div>
    <h2>Task App</h2>
    <br />
    <br />

    <h3>SHOW_TASK</h3>
    <br />

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>CONTENT</th>
          <th>STATUS</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ task.content }}</td>
          <td v-if="task.isFinished === true">
            <button @click="updateTask(task.id, task.isFinished)">完了</button>
          </td>
          <td v-else>
            <button @click="updateTask(task.id, task.isFinished)">作業中</button>
          </td>
          <td><button @click="deleteTask(task.id, task.isFinished)">削除</button></td>
        </tr>
      </tbody>
    </table>
    <br />

    <h3>ADD_TASK</h3>
    <br />
    <input type="text" v-model="content" />
    <button @click="createTask()">追加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

type TaskType = {
  id?: number;
  content: string;
  isFinished: boolean;
  createdAt?: string;
};

export default defineComponent({
  setup() {
    // axios
    const { $axios } = useContext();

    // asyncData
    useAsync(async () => {
      const result = await $axios.$get('/api/tasks');
      tasks.value = result.tasks;
    });

    // data
    const content = ref<string>('');
    const task = ref<TaskType>({
      content: content,
      isFinished: false,
    });
    const tasks = ref<TaskType[]>();

    // methods
    const createTask = async () => {
      window.location.href = 'http://localhost:3000';
      await $axios.$post('/api/tasks/store', {
        task: task.value,
      });
    };

    const deleteTask = async (id: number) => {
      window.location.href = 'http://localhost:3000';
      await $axios.$post('/api/tasks/delete', {
        id: id,
      });
    };

    const updateTask = async (id: number, isFinished: boolean) => {
      window.location.href = 'http://localhost:3000';
      await $axios.$post('/api/tasks/update', {
        id: id,
        isFinished: isFinished,
      });
    };

    return {
      // data
      content,
      task,
      tasks,
      // methods
      createTask,
      deleteTask,
      updateTask,
    };
  },
});
</script>