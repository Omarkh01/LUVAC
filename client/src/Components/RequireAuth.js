import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from '../context/StateContext';

const RequireAuth = ({ isAdmin }) => {
  const { auth } = useStateContext();
  const location = useLocation();

  return (
    auth?.user
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace/>
  )
}

export default RequireAuth