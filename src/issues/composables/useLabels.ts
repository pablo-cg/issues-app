import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import type { Label } from '../models';
import { useIssuesStore } from 'src/stores/issues';
import { computed } from 'vue';

async function getLabels() {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
  return data;
}

export const useLabels = () => {
  const issuesStore = useIssuesStore();

  const { data, isLoading } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    labels: data,
    isLoading,
    toggleLabel: issuesStore.toggleLabel,
    selectedLabels: computed(() => issuesStore.labels),
  };
};
