<script setup lang="ts">
import AppLoader from 'src/shared/components/AppLoader.vue';
import FilterSelector from '../components/filter/FilterSelector.vue';
import IssueList from '../components/issue/IssueList.vue';
import { useIssues } from '../composables/useIssues';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import FloatingButtons from '../components/FloatingButtons.vue';
import { FabButton } from '../models';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { useLabels } from '../composables/useLabels';

const store = useIssuesStore();
const { labels: storeLabels, state: storeState } = storeToRefs(store);

const { isLoading, issues } = useIssues({
  labels: storeLabels,
  state: storeState,
});

const { labels } = useLabels();

const labelsOptions = computed(
  () => labels.value?.map((label) => label.name) || []
);

// prettier puto 🤡
const title = computed(
  () =>
    `${process.env.GITHUB_USER || 'user'} / ${
      process.env.GITHUB_REPO || 'repo'
    }`
);

const isNewIssueOpen = ref(false);

const buttons: FabButton[] = [
  {
    icon: 'add',
    color: 'secondary',
    size: 'lg',
    action: () => {
      isNewIssueOpen.value = true;
    },
  },
];
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
  <FloatingButtons :buttons="buttons" />

  <NewIssueDialog v-model="isNewIssueOpen" :labels="labelsOptions" />
</template>

<style scoped></style>
