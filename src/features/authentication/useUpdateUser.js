import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: data => {
      queryClient.invalidateQueries(['user']);
      queryClient.setQueryData(['user'], data.user);
      toast.success('User data has been successfully updated');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}
