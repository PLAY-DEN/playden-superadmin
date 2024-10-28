import { Outlet } from "react-router-dom";
import { AuthBg } from "../assets/images";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-2">
            <div className="mx-auto my-auto">
                <Outlet />
            </div>
            <div className={`bg-playden-primary bg-cover bg-none bg-center w-full`} 
                style={{
                    backgroundImage: `url(${AuthBg})`,
                }}>
                    <div className='flex justify-center my-auto'>
                        <h1 className='text-[100px] text-white'>Logo</h1>
                    </div>
            </div>
        </div>
    );
}
export default AuthLayout;