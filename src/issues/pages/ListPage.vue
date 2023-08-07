<script setup lang="ts">
import AppLoader from 'src/shared/components/AppLoader.vue';
import FilterSelector from '../components/filter/FilterSelector.vue';
import IssueList from '../components/issue/IssueList.vue';
</script>

<template>
  <div class="row q-mb-lg">
    <span class="text-h4">Github Issues</span>
  </div>
  <div class="row">
    <section class="col-xs-12 col-md-4">
      <FilterSelector />
    </section>
    <section class="col-xs-12 col-md-8">
      <AppLoader color="secondary" size="5rem" :thickness="4" v-if="false" />
      <IssueList v-else />
    </section>
  </div>
</template>

<style scoped></style>
