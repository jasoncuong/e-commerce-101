import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";

const PaginationItem = ({ children }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = [i[1]];
    if (Number(children)) queries.page = children;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });

    console.log(queries);
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
