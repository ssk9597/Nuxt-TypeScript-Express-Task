<template>
  <div>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

export default defineComponent({
  setup() {
    const data = ref({});
    const { $axios } = useContext();
    useAsync(async () => {
      const result = await $axios.$get('/api');
      data.value = result;
    });
    return { data };
  },
});
</script>