import { useParams } from "react-router-dom";

const DetailProducts = () => {
  const { pid, title } = useParams();
  // console.log(pid);
  // console.log(title);

  return <div>DetailProducts</div>;
};

export default DetailProducts;
