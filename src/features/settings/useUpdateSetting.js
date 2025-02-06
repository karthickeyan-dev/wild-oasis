import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success('Settings has been updated successfully');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateSetting };
}
