import { useQuery } from '@tanstack/react-query';
import { getSettingsApi } from '../../services/apiSettings';

export default function useSettings() {
  const {
    error,
    isPending,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettingsApi,
  });
  return { error, isPending, settings };
}
