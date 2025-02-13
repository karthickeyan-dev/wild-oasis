import { useMutation } from '@tanstack/react-query';
import { signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignUp() {
  const { isPending, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => toast.success('New user has been created successfully'),
    onError: error => toast.error(error.message),
  });

  return { isPending, signUp };
}
