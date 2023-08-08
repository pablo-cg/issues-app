<script setup lang="ts">
import { Issue } from 'src/issues/models';
import IssueCard from './IssueCard.vue';

interface Props {
  issues: Issue[];
}

defineProps<Props>();
</script>

<template>
  <div class="row">
    <IssueCard v-for="issue in issues" :key="issue.id" :issue="issue" />
  </div>
</template>

<style scoped></style>
