import React from 'react';

const AccountSettings: React.FC = () => {
  return (
    <div className="bg-white mt-8">
      {/* User Information Section */}
      <div className="mb-10">
          <table className="max-w-[500px] border border-none">
             <tbody>
                 <tr className="border-none">
                    <td className="font-semibold py-2">Name:</td>
                    <td className="text-sm py-2">Sophie Super Admin</td>
                </tr>
                <tr className="border-none">
                    <td className="font-semibold py-2">Email address:</td>
                    <td className="text-sm py-2">sophiesuperad@gmail.com</td>
                </tr>
                <tr className="border-none">
                    <td className="font-semibold py-2">Phone number:</td>
                    <td className="text-sm py-2">+234 8043035200</td>
                </tr>
                <tr className="border-none">
                    <td className="font-semibold py-2">Role:</td>
                    <td className="text-sm py-2">Super Admin</td>
                </tr>
                <tr className='border-none'>
                    <td className="font-semibold py-2">Change password:</td>
                    <td className="text-sm py-2">****SuperAdmin****</td>
                </tr>
             </tbody>
          </table>
      </div>


      {/* Manage Admins Section */}
      <div className="">
        <h3 className= "font-semibold mb-4">Manage admins</h3>
        <div className="space-y-4 text-sm">
          <div className="flex gap-4">
            <span className="font-semibold">Sophie</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                 </svg>
            <p>Remove</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                 </svg>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Zak</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
            <p>Remove</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
               </svg>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Oyinkansola</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                 </svg>
            <p>Remove</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                 </svg>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Tolu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                 </svg>
            <p>Remove</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
              </svg>
            <p>Allocate new duties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
