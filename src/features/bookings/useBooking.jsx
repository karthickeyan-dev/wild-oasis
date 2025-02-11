import { useQuery } from '@tanstack/react-query';
import { getBookingApi } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export default function useBooking() {
  const { bookingId } = useParams();

  const {
    isPending,
    error,
    data: booking,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBookingApi(bookingId),
    retry: false,
  });

  return { isPending, error, booking };
}
