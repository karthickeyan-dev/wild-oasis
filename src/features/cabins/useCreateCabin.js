import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabinApi } from '../../services/apiCabins';

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabinApi(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success(`New cabin has been created`);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { isCreating, createCabin };
}
