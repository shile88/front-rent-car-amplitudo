import {
    Navigate,
} from 'react-router-dom';
import { useUserData } from '../context/UserContex';

const ProtectedRoute = ({ children }) => {
  const { userData } = useUserData();

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;