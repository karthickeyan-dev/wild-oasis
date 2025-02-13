import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <ButtonIcon
      disabled={isPending}
      onClick={logout}
      style={{ marginLeft: 'auto' }}
    >
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
