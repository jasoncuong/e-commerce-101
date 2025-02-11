import usePagination from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, params.get("page") || 1);
  // console.log(params.get("page"));

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT || 10;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };

  return (
    <div className="flex w-full items-center justify-between">
      {!+params.get("page") && (
        <span className="italuc text-sm">{`Show products 1 - ${Math.min(+import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT, totalCount)} of ${totalCount}`}</span>
      )}

      {+params.get("page") && (
        <span className="text-sm italic">{`Show products 1 - ${range()} of ${totalCount}`}</span>
      )}
      <div className="flex items-center">
        {pagination?.map((el, index) => (
          <PaginationItem key={index}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
