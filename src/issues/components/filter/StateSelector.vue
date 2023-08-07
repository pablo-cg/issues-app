<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues';

const issuesStore = useIssuesStore();
const { state } = storeToRefs(issuesStore);
</script>

<template>
  <q-btn-toggle
    v-model="state"
    toggle-color="primary"
    push
    spread
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style scoped></style>
