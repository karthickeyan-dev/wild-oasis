import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBookingApi } from '../../services/apiBookings';

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: bookingId =>
      updateBookingApi(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} is successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      // navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isCheckingOut, checkout };
}
