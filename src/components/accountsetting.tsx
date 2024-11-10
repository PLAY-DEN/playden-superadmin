import React from 'react';

const AccountSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-[-50px]">
      {/* User Information Section */}
      <div className="flex gap-6 mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <span className="font-semibold text-[20px] text-[#000000]">Name:</span>
            <span className="text-sm text-[#000000]">Sophie Super Admin</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-[20px] text-[#000000]">Email address:</span>
            <span className="text-sm text-[#000000]">sophiesuperad@gmail.com</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-[20px] text-[#000000]">Phone number:</span>
            <span className="text-sm text-[#000000]">+234 8043035200</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-[20px] text-[#000000]">Role:</span>
            <span className="text-sm text-[#000000]">Super Admin</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-[20px] text-[#000000]">Change password:</span>
            <span className="text-sm text-[#000000]">****SuperAdmin****</span>
          </div>
        </div>
      </div>

      {/* Manage Admins Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-[20px] font-semibold text-[#000000] mb-4">Manage admins</h3>
        <div className="space-y-4 text-sm">
          <div className="flex gap-4">
            <span className="font-semibold">Sophie</span>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Remove</p>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Zak</span>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Remove</p>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Oyinkansola</span>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Remove</p>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Allocate new duties</p>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Tolu</span>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Remove</p>
            <span className="text-xl font-bold text-black mt-[-5px]">{'>'}</span>
            <p>Allocate new duties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
