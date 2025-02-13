import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteBookingApi } from '../../services/apiBookings';

export default function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: id => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      toast.success(`Booking has been deleted`);
      navigate('/bookings');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
}
