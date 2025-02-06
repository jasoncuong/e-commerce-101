import usePagination from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount, productNumber }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.REACT_APP_PRODUCT_LIMIT || 10;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };

  return (
    <div className="flex w-main items-center justify-between">
      {!+params.get("page") && (
        <span className="italuc text-sm">{`Show products 1 - ${+import.meta.env.REACT_APP_PRODUCT_LIMIT || 10} of ${totalCount}`}</span>
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
