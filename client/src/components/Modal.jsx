import { useDispatch } from "react-redux";
import { showModal } from "../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
      className="absolute inset-0 z-50 flex items-center justify-center bg-overlay"
    >
      {children}
    </div>
  );
};

export default Modal;
