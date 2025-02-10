import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Services,
  DetailProducts,
  Blogs,
  FAQ,
  Products,
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProduct,
  ManageUser,
  CreateProduct,
  Dashboard,
} from "./pages/admin";
import { MemberLayout, Personal } from "./pages/member";
import path from "./utils/path";
import { useEffect } from "react";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Modal } from "./components";

const App = () => {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="relative font-main">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        {/* Public */}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProducts />}
          />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>

        {/* Admin */}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>

        {/* Member */}
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>

        {/* Others */}
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.ALL} element={<Home />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
