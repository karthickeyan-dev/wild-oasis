import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export default function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryKey: ['today-activities'],
    queryFn: getStaysTodayActivity,
  });

  return { isPending, activities };
}
