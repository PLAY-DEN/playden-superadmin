import { Outlet } from "react-router-dom";
import { AuthBg, logo } from "../assets/images";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
            <div className="mx-auto my-auto p-6 sm:p-10">
                <Outlet />
            </div>
            {/* Background Image Container - Only visible on medium and larger screens */}
            <div 
                className="hidden md:block w-full" 
                style={{
                    backgroundImage: `url(${AuthBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex justify-center items-center h-screen">
                    <img src={logo} alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
