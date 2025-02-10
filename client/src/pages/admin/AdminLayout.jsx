import { Outlet, Navigate } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  console.log({ isLoggedIn, current });

  if (!isLoggedIn || !current || +current.role !== 8386)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      <div>Admin layout</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
