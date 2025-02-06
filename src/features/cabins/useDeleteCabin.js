import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export default function UseDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success(`cabin deleted successfully`);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
