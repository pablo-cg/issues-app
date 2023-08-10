import { defineStore } from 'pinia';
import { State } from 'src/issues/models';
import { ref } from 'vue';

const issuesStoreDefinition = () => {
  const state = ref<State>(State.ALL);
  const labels = ref<string[]>([]);

  function toggleLabel(label: string) {
    if (labels.value.includes(label)) {
      labels.value = labels.value.filter((lbl) => lbl !== label);
      return;
    }

    labels.value.push(label);
  }

  return {
    state,
    labels,
    toggleLabel,
  };
};

export const useIssuesStore = defineStore('issuesStore', issuesStoreDefinition);
