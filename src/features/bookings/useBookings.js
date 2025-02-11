import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookingsApi } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { RESULTS_PER_PAGE } from '../../utils/constant';

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORT
  const sortValue = searchParams.get('sort') || 'startDate-desc';
  const [field, direction] = sortValue.split('-');
  const sort = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isPending,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ['bookings', filter, sort, page],
    queryFn: () => getBookingsApi({ filter, sort, page }),
  });

  // PRE_FETCHING
  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page + 1],
      queryFn: () => getBookingsApi({ filter, sort, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page - 1],
      queryFn: () => getBookingsApi({ filter, sort, page: page - 1 }),
    });
  }

  return { isPending, error, bookings, count };
}
