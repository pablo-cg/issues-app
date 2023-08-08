<script setup lang="ts">
import AppLoader from 'src/shared/components/AppLoader.vue';
import FilterSelector from '../components/filter/FilterSelector.vue';
import IssueList from '../components/issue/IssueList.vue';
import { useIssues } from '../composables/useIssues';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useIssuesStore();
const { labels, state } = storeToRefs(store);

const { isLoading, issues } = useIssues({ labels, state });

const title = computed(
  () =>
    `${process.env.GITHUB_USER || 'user'} / ${
      process.env.GITHUB_REPO || 'repo'
    }`
);
</script>

<template>
  <div class="row q-mb-lg">
    <span class="text-h4">{{ title }}</span>
  </div>
  <div class="row">
    <section class="col-xs-12 col-md-3">
      <FilterSelector />
    </section>
    <section class="col-xs-12 col-md-9">
      <AppLoader
        color="secondary"
        size="5rem"
        :thickness="4"
        v-if="isLoading"
      />
      <IssueList :issues="issues || []" v-else />
    </section>
  </div>
</template>

<style scoped></style>
