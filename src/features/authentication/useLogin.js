import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { isPending, login };
}
