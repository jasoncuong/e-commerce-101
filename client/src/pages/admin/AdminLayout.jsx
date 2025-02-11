import { Outlet, Navigate } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "../../components";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);

  if (!isLoggedIn || !current || +current.role !== 8386)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="relative flex min-h-screen w-full bg-zinc-900 text-white">
      <div className="fixed bottom-0 top-0 w-[327px] flex-none">
        <AdminSidebar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
