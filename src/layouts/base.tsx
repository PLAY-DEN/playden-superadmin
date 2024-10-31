import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sideBar";

const BaseLayout = () => {
    return (
        <div className="flex flex-col text-base mx-auto font-dm-sans">
            <Navbar />
            <Sidebar />
            <Outlet />
        </div>
    );
}
export default BaseLayout;