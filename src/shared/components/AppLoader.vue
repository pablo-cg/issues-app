<script setup lang="ts">
interface Props {
  color?: string;
  size?: string;
  thickness?: number;
  showText?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3rem',
  thickness: 5,
  showText: true,
});
</script>

<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span class="q-mt-sm" v-if="showText">Loading</span>
  </div>
</template>

<style scoped></style>
