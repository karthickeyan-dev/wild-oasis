import styled from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the user
  const { isPending, isAuthenticated } = useUser();

  // 2. If NOT authenticated, then redirect to login
  useEffect(() => {
    if (!isPending && !isAuthenticated) navigate('/login');
  }, [isPending, isAuthenticated, navigate]);

  // 3. Show spinner while loading
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If Authenticated, then render App
  if (isAuthenticated) return children;
}
