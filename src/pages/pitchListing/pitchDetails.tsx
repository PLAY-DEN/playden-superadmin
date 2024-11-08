import { pitchPic } from '../../assets/images';
import { useParams } from 'react-router-dom';
import { Ellipse,Home7 } from '../../assets/images'; 

const PitchDetails: React.FC = () => {
    const { pitchId } = useParams<{ pitchId: string }>(); // Get the pitch ID from the URL

    // Mock data for demonstration purposes. Replace with actual API data in a real app.
    const pitchData = {
        name: "Plutous Clubhouse Field",
        sport: "Football",
        size: "5X5",
        manager: "Ahmed Salisu",
        price: "₦10,000/hr",
        owner: "Jim Ioude",
        phone: "+234 8154035668",
        address: "Plutous club house U/Rimi Kaduna",
        image: "path/to/pitch-image.jpg", // Replace with actual image path
    };

    return (
        <div className="relative ml-72 p-8 mt-20 overflow-auto"> {/* Full width with padding */}
            <div className='flex flex-row justify-between'>
                 <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Listing</h2>
                 <select
                        name="days"
                        id="options"
                        className="text-[14px] font-bold text-[#141B34] w-36 h-9 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
                        defaultValue={12}
                    >
                        <option value="days">Last 30 Days</option>
                    </select>
            </div>
            {/* Pitch Information */}
            <div className="flex gap-6 mt-6 w-[680px]">
                <img src={pitchPic} alt="Pitch" className="w-[300px] h-[189px] rounded-md" />
                <div className="text-sm mt-3">
                    <p><strong>PITCH NAME:</strong> {pitchData.name}</p>
                    <p><strong>SPORT:</strong> {pitchData.sport}</p>
                    <p><strong>PITCH SIZE:</strong> {pitchData.size}</p>
                    <p><strong>PITCH MANAGER:</strong> {pitchData.manager}</p>
                    <p><strong>PRICE:</strong> {pitchData.price}</p>
                    <p><strong>PITCH OWNER:</strong> {pitchData.owner}</p>
                    <p><strong>PITCH OWNER PHONE NUMBER:</strong> {pitchData.phone}</p>
                    <p><strong>PITCH ADDRESS:</strong> {pitchData.address}</p>
                </div>
            </div>

            {/* Booking History */}
            <div className="mt-8">
                <h2 className="font-bold text-lg mb-4 text-[#808B9B]">Booking History</h2>
                <table className="w-[680px] border">
                    <thead className="bg-transparent text-[#808B9B]">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Date/Time</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Pitch Name</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example booking data */}
                        <tr className='text-[14px] text-[#01031A] font-semibold'>
                            <td className="p-2">Hassan Abdul <br/> <span className='text-[#808B9B] text-[12px]'>Ref# 1203948384</span></td>
                            <td className="p-2">June 4, 2020<br/><span className='text-[#808B9B] text-[12px]'> 5:03:45 AM</span></td>
                            <td className="p-1 ">₦10,000</td>
                            <td className="p-1 ">Plutous Clubhouse Field</td>
                            <td className="p-1 cursor-pointer"><u>View Transaction Details</u></td>
                        </tr>
                        <tr className='text-[14px] text-[#01031A] font-semibold'>
                            <td className="p-2">Hassan Abdul <br/> <span className='text-[#808B9B] text-[12px]'>Ref# 1203948384</span></td>
                            <td className="p-2">June 4, 2020<br/><span className='text-[#808B9B] text-[12px]'> 5:03:45 AM</span></td>
                            <td className="p-1 ">₦10,000</td>
                            <td className="p-1 ">Plutous Clubhouse Field</td>
                            <td className="p-1 cursor-pointer"><u>View Transaction Details</u></td>
                        </tr>
                        <tr className='text-[14px] text-[#01031A] font-semibold'>
                            <td className="p-2">Hassan Abdul <br/> <span className='text-[#808B9B] text-[12px]'>Ref# 1203948384</span></td>
                            <td className="p-2">June 4, 2020<br/><span className='text-[#808B9B] text-[12px]'> 5:03:45 AM</span></td>
                            <td className="p-1 ">₦10,000</td>
                            <td className="p-1 ">Plutous Clubhouse Field</td>
                            <td className="p-1 cursor-pointer"><u>View Transaction Details</u></td>
                        </tr>
                        <tr className='text-[14px] text-[#01031A] font-semibold'>
                            <td className="p-2">Hassan Abdul <br/> <span className='text-[#808B9B] text-[12px]'>Ref# 1203948384</span></td>
                            <td className="p-2">June 4, 2020<br/><span className='text-[#808B9B] text-[12px]'> 5:03:45 AM</span></td>
                            <td className="p-1 ">₦10,000</td>
                            <td className="p-1 ">Plutous Clubhouse Field</td>
                            <td className="p-1 cursor-pointer"><u>View Transaction Details</u></td>
                        </tr>
                        <tr className='text-[14px] text-[#01031A] font-semibold'>
                            <td className="p-2">Hassan Abdul <br/> <span className='text-[#808B9B] text-[12px]'>Ref# 1203948384</span></td>
                            <td className="p-2">June 4, 2020<br/><span className='text-[#808B9B] text-[12px]'> 5:03:45 AM</span></td>
                            <td className="p-1 ">₦10,000</td>
                            <td className="p-1 ">Plutous Clubhouse Field</td>
                            <td className="p-1 cursor-pointer"><u>View Transaction Details</u></td>
                        </tr>
                        {/* Repeat for additional bookings */}
                    </tbody>
                </table>
            </div>

            {/* Statistics Panel */}
            <div className="flex flex-col ml-[680px] gap-4 mt-[-600px] text-white text-[12px]">
               <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-68px] w-[110px] h-[110px]' />
              </div>
               <div className="w-[320px] h-[180px] bg-[#41244B] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-38px] overflow-hidden'/>
              </div>
               <div className="w-[320px] h-[180px] bg-[#01031A] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-68px] w-[110px] h-[110px]' />
              </div>
               <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-68px] w-[110px] h-[110px]' />
              </div>
              
            </div>
            <div className="flex flex-row gap-3 mt-[-160px] text-white text-[12px]">
               <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-68px] w-[110px] h-[110px]' />
              </div>
               <div className="w-[320px] h-[180px] bg-[#41244B] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-68px] w-[110px] h-[110px]' />
              </div>
            </div>
        </div>
    );
};

export default PitchDetails;
