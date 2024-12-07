import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { bookingImg } from '../assets/images';


const userDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.users.data.users?.find((user) => user.id === Number(id))
  );

  if (!user) {
    return <div className="ml-72 p-8 mt-20">User not found.</div>;
  }


  return (
    <div className="bg-white relative ml-72 p-8 mt-24">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">User Details</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-gray-500">{user.id}</p>
      </div>
      
      <div className="flex flex-row">
        <div>
          <h2 className="ml-60 mt-5 font-bold">User Details</h2>
          <img
            src={user.profile_image}
            alt={`${user.username}'s profile`}
            className="mt-[-5px] w-52 h-58"
          />
        </div>
        
      <div className='text-[#333543] text-xs mt-12 ml-[-85px]'>
           <table className="w-full">
              <tbody>
                <tr className="border-none">
                   <td className="font-semibold">Date joined:</td>
                   <td className='pl-5 py-1'>{user.created_at}</td>
                </tr>
                <tr className="border-none">
                  <td className="font-semibold">Number of booking:</td>
                  <td className='pl-5 py-1'>{user.bookings_count}</td>
               </tr>
               <tr className="border-none">
                  <td className="font-semibold">Number of cancellation:</td>
                  <td className='pl-5 py-1'>{user.cancelled_bookings_count}</td>
               </tr>
               <tr className="border-none">
                  <td className="font-semibold">Last Booking:</td>
                  <td className='pl-5 py-1'>{user.updated_at}</td>
               </tr>
               <tr className="border-none">
                   <td className="font-semibold">Email address:</td>
                   <td className='pl-5 py-1'>{user.email}</td>
               </tr>
               <tr className="border-none">
                  <td className="font-semibold">Mobile number:</td>
                  <td className='pl-5 py-1'>{user.phone_number}</td>
               </tr>
               <tr className="border-none">
                  <td className="font-semibold">Play points:</td>
                  <td className='pl-5 py-1'>{user.cashbacks_sum_coins}</td>
               </tr>
             </tbody>
          </table>
       </div>

      
       <div className='mt-[280px] flex flex-row gap-3 ml-[-300px]'>
           <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg cursor-pointer">
                Suspend
           </button>
           <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-[#8F55A2] text-white rounded-lg cursor-pointer">
                 Ban/Delete
           </button>
      </div>
    </div>
  </div>
  );
};

export default userDetails;
