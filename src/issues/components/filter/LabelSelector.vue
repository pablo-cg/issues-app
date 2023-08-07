<script setup lang="ts">
import { useLabels } from 'src/issues/composables/useLabels';
import AppLoader from 'src/shared/components/AppLoader.vue';

const { isLoading, labels, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <AppLoader size="50px" :thickness="1" :show-text="false" v-if="isLoading" />
  <q-chip
    :outline="!selectedLabels.includes(label.name)"
    size="1rem"
    v-else
    v-for="label of labels"
    :key="label.id"
    :style="{ color: `#${label.color}` }"
    clickable
    :label="label.name"
    @click="toggleLabel(label.name)"
  >
  </q-chip>
</template>

<style scoped></style>
