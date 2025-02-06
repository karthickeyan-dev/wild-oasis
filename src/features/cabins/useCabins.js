import { useQuery } from '@tanstack/react-query';
import { getCabinsApi } from '../../services/apiCabins';

export default function UseCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabinsApi,
  });

  return { isPending, cabins, error };
}
