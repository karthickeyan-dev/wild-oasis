import { useQuery } from '@tanstack/react-query';
import { getBookingsApi } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export default function useBookings() {
  const [searchParams] = useSearchParams();
  //FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  //SORT
  const sortValue = searchParams.get('sort') || 'startDate-desc';
  const [field, direction] = sortValue.split('-');
  const sort = { field, direction };
  //PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isPending,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ['bookings', filter, sort, page],
    queryFn: () => getBookingsApi({ filter, sort, page }),
  });

  return { isPending, error, bookings, count };
}
