import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sideBar";

const BaseLayout = () => {
  return (
    <div className="flex flex-col text-base mx-auto font-dm-sans">
      <Navbar />
      {/* <Sidebar /> */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-[275px] md:ml-64 lg:ml-72 xl:ml-80 p-10 md:p-14 mt-20 bg-[#F7F7F7] h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default BaseLayout;
