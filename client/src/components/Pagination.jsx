import usePagination from "../hooks/usePagination";
import PaginationItem from "./PaginationItem";

const Pagination = ({ totalCount }) => {
  const pagination = usePagination(66, 2);

  return (
    <div className="flex items-center">
      {pagination.map((el, index) => (
        <PaginationItem key={index}>{el}</PaginationItem>
      ))}
    </div>
  );
};

export default Pagination;
