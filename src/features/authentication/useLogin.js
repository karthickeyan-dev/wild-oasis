import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { isPending, login };
}
