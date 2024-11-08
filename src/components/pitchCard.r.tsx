import { useNavigate } from 'react-router-dom';
import { pitchPic, coloredStar, star } from "../assets/images";

interface PitchCardProps {
    sport: string;
    pitchSize: string;
    manager: string;
    contact: string;
    price: string;
    id: string; 
}

const PitchCard: React.FC<PitchCardProps> = ({ sport, pitchSize, manager, contact, price, id }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/pitch-listing/${id}`); // Redirect to PitchDetails with the pitch ID
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <img src={pitchPic} alt="Pitch" className="rounded-md" />
            <div className="flex-1">
                <p className="text-sm font-bold">SPORT: {sport}</p>
                <p className="text-sm">PITCH SIZE: {pitchSize}</p>
                <p className="text-sm">PITCH MANAGER: {manager}</p>
                <p className="text-sm">MOBILE NUMBER: {contact}</p>
                <p className="text-sm">PRICE: {price}</p>
            </div>
            <div className="flex flex-col gap-20 items-center">
                <button 
                    className="text-white bg-playden-primary rounded-xl w-36 h-10 px-w py-2 text-sm"
                    onClick={handleViewDetails} // Add the click handler
                >
                    View Details
                </button>
                <div className="flex flexrow gap-2 mr-10">
                    <button className="text-white bg-playden-primary rounded-lg px-4 py-2 text-xs">Review</button>
                    <img src={coloredStar} alt="rating" className="w-[20px] h-[20px] mt-2"/>
                    <img src={coloredStar} alt="rating" className="w-[20px] h-[20px] mt-2"/>
                    <img src={star} alt="rating" className="w-[20px] h-[20px] mt-2"/>
                    <img src={star} alt="rating" className="w-[20px] h-[20px] mt-2"/>
                </div>
                {/* Add star rating component here */}
            </div>
        </div>
    );
};


export default PitchCard;
