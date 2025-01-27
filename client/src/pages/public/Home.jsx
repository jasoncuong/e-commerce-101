import { Sidebar, Banner, BestSeller } from "../../components";

const Home = () => {
  return (
    <div className="flex w-main">
      <div className="flex w-[20%] flex-auto flex-col gap-5">
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className="flex w-[80%] flex-auto flex-col gap-5 pl-5">
        <Banner />
        <BestSeller />
      </div>
    </div>
  );
};

export default Home;
