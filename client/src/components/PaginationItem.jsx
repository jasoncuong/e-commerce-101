import clsx from "clsx";

const PaginationItem = ({ children }) => {
  return (
    <div
      className={clsx(
        "flex h-10 w-10 cursor-pointer justify-center p-4 hover:rounded-full hover:bg-gray-300",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center",
      )}
    >
      {children}
    </div>
  );
};

export default PaginationItem;
