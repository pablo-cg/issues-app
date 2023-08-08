<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLoader from 'src/shared/components/AppLoader.vue';
import IssueCard from '../components/issue/IssueCard.vue';
import { useIssue } from '../composables/useIssue';

const route = useRoute();

const issueId = computed(() => Number(route.params?.id || 0));

const { comments, isCommentsLoading, issue, isIssueLoading } = useIssue(
  issueId.value
);
</script>

<template>
  <main>
    <section class="q-mb-lg">
      <RouterLink to="/" class="text-white">Go Back</RouterLink>
    </section>
    <AppLoader color="white" v-if="isIssueLoading" />
    <template v-if="issue">
      <IssueCard :issue="issue" />
    </template>
    <AppLoader
      :thickness="1"
      size="1.5rem"
      color="white"
      :show-text="false"
      v-if="isCommentsLoading"
    />
    <section class="column q-mt-xl" v-else>
      <span class="text-h5 q-mb-lg">Comments ({{ issue?.comments }})</span>
      <IssueCard
        v-for="comment in comments"
        :key="comment.id"
        :issue="comment"
        is-comment
      />
    </section>
  </main>
</template>

<style scoped></style>
