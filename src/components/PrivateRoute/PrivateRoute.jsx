import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectedTo = '/' }) => {
  //   const authUser = useSelector(state => state.authUser.token);

  //   return authUser ? children : <Navigate to={redirectedTo} />;

  return <></>;
};

export default PrivateRoute;
