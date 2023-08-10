import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from 'src/api/githubApi';
import { Issue } from '../models';

interface IssuePayload {
  title: string;
  labels?: string[];
  body?: string;
}

async function createIssue(payload: IssuePayload) {
  const { data } = await githubApi.post<Issue>('/issues', payload);

  return data;
}

export const useIssueMutation = () => {
  const queryClient = useQueryClient(); // No se puede desestructurar

  const { mutate, isLoading, isSuccess, reset } = useMutation({
    mutationFn: createIssue,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.setQueryData(['issue', data.number], data);
    },
  });

  return {
    createIssue: mutate,
    isLoading,
    isSuccess,
    resetMutation: reset,
  };
};
