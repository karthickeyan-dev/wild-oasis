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

  const {
    isPending,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ['bookings', filter, sort],
    queryFn: () => getBookingsApi({ filter, sort }),
  });

  return { isPending, error, bookings };
}
