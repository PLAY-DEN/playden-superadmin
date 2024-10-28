import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <div className="flex flex-col text-base mx-auto font-dm-sans">
            Header
            <Outlet />
            Footer
        </div>
    );
}
export default BaseLayout;