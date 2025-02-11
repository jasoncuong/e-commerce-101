import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";

const PaginationItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      onClick={handlePagination}
      disabled={!Number(children)}
      type="button"
      className={clsx(
        "flex h-10 w-10 cursor-pointer justify-center p-4",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center hover:rounded-full hover:bg-gray-300",
        +params.get("page") === +children && "rounded-full bg-gray-300",
        !+params.get("page") && +children === 1 && "rounded-full bg-gray-300",
      )}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
