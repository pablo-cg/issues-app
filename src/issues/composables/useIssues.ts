import { useQuery } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue, State } from '../models/issue';
import { ComputedRef, Ref } from 'vue';

async function getIssues(labels: string[], state: State) {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length) params.append('labels', labels.join(','));

  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
}

interface issuesOptions {
  labels: Ref<string[]> | ComputedRef<string[]>;
  state: Ref<State> | ComputedRef<State>;
}

export const useIssues = (options: issuesOptions) => {
  const { labels, state } = options;

  const { isLoading, data, isError } = useQuery({
    queryKey: ['issues', { labels, state }],
    queryFn: () => getIssues(labels.value, state.value),
  });

  return {
    issues: data,
    isLoading,
    isError,
  };
};
