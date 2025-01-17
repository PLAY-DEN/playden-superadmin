import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className="my-4 p-3 border w-fit rounded-full">
      <FaArrowLeft
        onClick={() => navigate(-1)}
        className={`cursor-pointer ${className}`}
      />
    </div>
  );
};

export default BackButton;
