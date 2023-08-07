<script setup lang="ts">
import IssueCard from './IssueCard.vue';
</script>

<template>
  <div class="row">
    <IssueCard v-for="i in 10" :key="i" />
  </div>
</template>

<style scoped></style>
