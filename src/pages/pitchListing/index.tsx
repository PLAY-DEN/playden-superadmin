import { filter, plus } from '../../assets/images';
import PitchCard from '../../components/pitchCard.r';
import { useNavigate } from 'react-router-dom';


const PitchListing: React.FC = () => {
    const navigate = useNavigate();
    const pitches = [
        { id: '1', imageSrc: 'path/to/image1.jpg', sport: 'Football', pitchSize: '5x5', manager: 'Ahmed Salisu', contact: '+234 8043035200', price: '₦10,000/hr' },
        { id: '2', imageSrc: 'path/to/image1.jpg', sport: 'Basketball', pitchSize: 'Full Court', manager: 'Jane Doe', contact: '+234 8051234567', price: '₦15,000/hr' },
        { id: '3', imageSrc: 'path/to/image1.jpg', sport: 'Tennis', pitchSize: 'Doubles Court', manager: 'John Smith', contact: '+234 8067890123', price: '₦7,500/hr' },
        { id: '4', imageSrc: 'path/to/image1.jpg', sport: 'Volleyball', pitchSize: 'Standard', manager: 'Emily Davis', contact: '+234 8072345678', price: '₦8,000/hr' },
    ];

    return (
        <div className="relative ml-72 p-8 mt-20 overflow-auto">
            <div className='flex flex-row justify-between'>
                <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Listing</h2>
                <div className='flex flex-row gap-2'>
                    <p className='text-[#141B34] text-[17px] font-bold mt-2 ml-64'>showing</p>
                    <select
                        name="days"
                        id="options"
                        className="text-[17px] font-bold text-[#141B34] w-24 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
                        defaultValue={12}
                    >
                        <option value="days">12</option>
                    </select>
                </div>
                <div className='bg-[#8F55A224] font-bold text-[#141B34] flex flex-row w-32 h-12 py-4 px-3 justify-between rounded-lg ml-10'>
                    <img src={filter} alt="filter" className='w-4 h-4' />
                    <p className='mt-[-5px]'>filter</p>
                </div>
                <button onClick={() => navigate('/add-new-pitch')} className='flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg'>
                    <img src={plus} alt="" className='text-white font-bold mt-1' />
                    <p>Add New Pitch</p>
                </button>
            </div>

            {/* Grid for Pitch Cards */}
            <div className="grid grid-cols-1 gap-6 mt-4">
                {pitches.map((pitch) => (
                    <PitchCard key={pitch.id} {...pitch} />
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4">
                <button className="text-playden-primary">Previous</button>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                        <button key={page} className={`px-2 py-1 rounded ${page === 1 ? 'bg-playden-primary text-white' : 'bg-gray-100 text-black'}`}>
                            {page}
                        </button>
                    ))}
                </div>
                <button className="text-playden-primary">Next</button>
            </div>
        </div>
    );
};

export default PitchListing;
