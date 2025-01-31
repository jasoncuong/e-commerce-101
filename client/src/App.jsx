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
import path from "./utils/path";
import { useEffect } from "react";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
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

        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
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
