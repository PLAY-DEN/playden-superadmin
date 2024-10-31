import { mainLogo, pattern } from "../assets/images";
import { FaEnvelope, FaBell, FaSearch } from 'react-icons/fa';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-[#3A1A5B] mb-8 px-8 py-4 flex items-center justify-between shadow-lg fixed w-full z-10 h-24">
            {/* Left Section: Logo and Select */}
            <div className="flex items-center gap-4">
                <img src={mainLogo} alt="logo" />

                <select
                    name="admin"
                    id="options"
                    className="bg-black text-white text-xs w-32 h-8 pt-2 px-3 border border-white border-opacity-40 rounded-md"
                    defaultValue="Super Admin"
                >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            {/* Middle Section: Search, Message, and Notification Icons */}
            <div className="flex items-center gap-6 justify-center w-[calc(100%-16rem)]"> {/* Adjusted width */}
                <div className="flex items-center gap-4">
                    <FaEnvelope className="text-white text-lg cursor-pointer hover:text-opacity-80" />
                    <FaBell className="text-white text-lg cursor-pointer hover:text-opacity-80" />
                </div>

                <div className="relative w-80"> {/* Increased width of input */}
                    <input 
                        type="text" 
                        placeholder="Search"
                        className="w-full bg-transparent text-white border border-white border-opacity-40 rounded-full px-4 py-2 placeholder:text-opacity-50 focus:outline-none"
                        style={{ paddingRight: '3rem', paddingLeft: '1.5rem' }} // Padding for the search icon
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70" /> {/* Positioned the icon to the right */}
                    <style>
                        {`
                            input::placeholder {
                                font-weight: bold; /* Make placeholder text bolder */
                                color: rgba(255, 255, 255, 0.5); /* Adjust color to match lighter shade */
                            }
                        `}
                    </style>
                </div>
            </div>

            {/* Right Section: Full-Height Profile Image */}
            <div className="absolute right-0 top-0 h-full w-72">
                <img src={pattern} alt="User Profile" className="h-full w-full object-cover rounded-full" />
            </div>
        </nav>
    );
}

export default Navbar;
