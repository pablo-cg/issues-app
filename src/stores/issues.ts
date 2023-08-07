import { defineStore } from 'pinia';
import { ref } from 'vue';

const State = {
  ALL: '',
  OPEN: 'open',
  CLOSED: 'closed',
} as const;

type State = (typeof State)[keyof typeof State];

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
