import { computed } from 'vue';
import { githubApi } from 'src/api/githubApi';
import { Issue } from '../models';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

async function getIssue(id: number) {
  const { data } = await githubApi.get<Issue>(`/issues/${id}`);
  return data;
}

async function getComments(id: number) {
  const { data } = await githubApi.get<Issue[]>(`/issues/${id}/comments`);
  return data;
}

interface issueOptions {
  autoload?: boolean;
}

export const useIssue = (issueId: number, options: issueOptions = {}) => {
  const { autoload = true } = options;

  const queryClient = useQueryClient();

  const {
    isLoading: isIssueLoading,
    data: issue,
    isError: isIssueError,
  } = useQuery({
    queryKey: ['issue', issueId],
    queryFn: () => getIssue(issueId),
    staleTime: 1000 * 60, // 1 minute,
    enabled: autoload,
  });

  const {
    isLoading: isCommentsLoading,
    data: comments,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ['issue', issueId, 'comments'],
    queryFn: () => getComments(issueId),
    staleTime: 1000 * 60, // 1 minute
    // enabled: computed(() => !!issue.value),
    enabled: autoload,
  });

  function prefetchIssue() {
    queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssue(issueId),
      staleTime: 1000 * 60, // 1 minute
    });

    queryClient.prefetchQuery({
      queryKey: ['issue', issueId, 'comments'],
      queryFn: () => getComments(issueId),
      staleTime: 1000 * 60, // 1 minute
    });
  }

  function setIssueCache(issue: Issue) {
    queryClient.setQueryData(['issue', issue.number], issue);
  }

  return {
    comments,
    isCommentsError,
    isCommentsLoading,
    isIssueError,
    isIssueLoading,
    issue,
    prefetchIssue,
    setIssueCache,
  };
};
