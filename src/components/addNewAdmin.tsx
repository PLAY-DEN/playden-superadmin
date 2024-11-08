import { useParams } from 'react-router-dom';
import { bookingImg } from '../assets/images'; 

const adminDetails = {
  id: "#123456",
  name: "Oyinkansola Soleye",
  mobileNumber: "+234 7064084648",
  email: "oyinkansola@gmail.com",
  bankName: "Access Bank",
  bankDetails: "123456489",
};

const AddNewAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-24">
      
      {/* Header Section */}
      <div className='flex flex-row justify-between'>
          <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Admin Management</h2>
            <div className='flex flex-row gap-2'>
               <p className='text-[#141B34] text-[17px] font-bold mt-2 ml-72'>showing</p>
                  <select
                      name="days"
                      id="options"
                      className="text-[17px] font-bold text-[#141B34] w-24 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
                      defaultValue={12}
                    >
                      <option value="days">12</option>
                  </select>
                </div>
            </div>
      
      {/* Admin Info Section */}
      <div className="mt-20 ml-20">
        <h2 className="text-xl font-semibold">{adminDetails.name}</h2>
        <p className="text-gray-500">{adminDetails.id}</p>
      </div>

      <div className="mt-[-20px] flex flex-row ml-24">
        <div>
          <h2 className="ml-60 mt-14 font-bold">Admin Details</h2>
          <img
            src={bookingImg}
            alt={`${adminDetails.name}'s profile`}
            className="mt-[-18px] object-cover" 
          />
        </div>

        <div className="text-[#333543] text-xs mt-24 gap-4 ml-[-120px] flex flex-col">
          <div className="flex gap-32">
            <span className="font-semibold">Mobile Number:</span>
            <span>{adminDetails.mobileNumber}</span>
          </div>
          <div className="flex gap-32">
            <span className="font-semibold">Email Address:</span>
            <span>{adminDetails.email}</span>
          </div>
          <div className="flex gap-40">
            <span className="font-semibold">Bank Name:</span>
            <span>{adminDetails.bankName}</span>
          </div>
          <div className="flex gap-36">
            <span className="font-semibold">Bank Details:</span>
            <span>{adminDetails.bankDetails}</span>
          </div>
        </div>
      </div>

      <button className="ml-96 mt-[-40px] h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg hover:bg-purple-900">
        Save
      </button>
    </div>
  );
};

export default AddNewAdmin;
