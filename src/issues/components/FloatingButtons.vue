<script setup lang="ts">
import { FabButton } from '../models';

interface Props {
  buttons: FabButton[];
}

defineProps<Props>();
</script>

<template>
  <section class="fab">
    <q-btn
      class="q-ml-md"
      v-for="button in buttons"
      :key="button.icon + button.color"
      :color="button.color || 'primary'"
      round
      push
      :size="button.size"
      :icon="button.icon"
      @click="button.action"
    />
  </section>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
