import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBookingApi } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export default function UseCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingApi(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} is successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return { isCheckingIn, checkin };
}
