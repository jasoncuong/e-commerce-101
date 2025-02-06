import { useMemo } from "react";
import { generateRange } from "../utils/helpers";
import icons from "../utils/icon";

const { BiDotsHorizontalRounded } = icons;

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = import.meta.env.REACT_APP_PRODUCT_LIMIT || 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    // [1,2,3,4,5,6]
    if (paginationCount <= totalPaginationItem) {
      return generateRange(1, paginationCount);
    }

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    // [1,...,6,7,8,9,10]
    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BiDotsHorizontalRounded />, ...rightRange];
    }

    // [1,2,3,4,5,...,10]
    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BiDotsHorizontalRounded />, paginationCount];
    }

    // [1,...,5,6,7,...,10]
    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <BiDotsHorizontalRounded />,
        ...middleRange,
        <BiDotsHorizontalRounded />,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;

// Pageone + Ulti + Current + sibling + 2*3dots
// min = 6 => sibling + 5
// totalPagination: 66, limitProduct = 10 => totalPagination = 7 (66 / 10 = 6.6 => 7)
// totalPagination: 58, limitProduct = 10 => totalPagination = 6 (58 / 10 = 5.8 => 6)
// totalPaginationItem: sibling + 5
// sibling = 1

// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
// [1,2,3,4,5,...,10]
// [1,...,5,6,7,...,10]
