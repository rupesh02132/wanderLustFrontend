// src/components/PrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, admin }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  
  if (admin && !userInfo.isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default PrivateRoute;

// Usage in App.js
