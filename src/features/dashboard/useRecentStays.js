import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export default function useRecentStays() {
  const [searchParam] = useSearchParams();
  const numDays = searchParam.get('last') ? Number(searchParam.get('last')) : 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(stay => stay.status !== 'unconfirmed');

  return { isPending, confirmedStays, numDays };
}
