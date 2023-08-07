<script setup lang="ts">
import AppLoader from 'src/shared/components/AppLoader.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue/IssueCard.vue';

const route = useRoute();

const issueId = computed(() => Number(route.params?.id || 0));
</script>

<template>
  <AppLoader color="white" v-if="false" />
  <main v-else>
    <section class="q-mb-lg">
      <RouterLink to="/" class="text-white">Go Back</RouterLink>
    </section>
    <IssueCard />
    <AppLoader
      :thickness="1"
      size="1.5rem"
      color="white"
      :show-text="false"
      v-if="false"
    />
    <section class="column q-mt-xl" v-else>
      <span class="text-h5 q-mb-lg">Comments ({{ 5 }})</span>
      <IssueCard v-for="comment in 5" :key="comment" />
    </section>
  </main>
</template>

<style scoped></style>
