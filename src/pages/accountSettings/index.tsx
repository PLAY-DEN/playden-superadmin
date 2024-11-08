import React from 'react';
import { profileImage } from '../../assets/images';

const AccountSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-20 ml-72">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Settings</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* Tabs for Account Settings and System Settings */}
      <div className="flex gap-4 mt-20 mb-8">
        <button className="bg-[#8F55A2] text-white py-2 px-6 rounded-md font-semibold">
          Account Settings
        </button>
        <button className="text-white bg-playden-primary py-2 px-6 rounded-md font-semibold hover:text-black">
          System Settings
        </button>
      </div>

      {/* Profile and Details */}
      <div className="flex gap-6 mb-8">
        <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-200" />
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <span className="font-semibold text-gray-600">Name:</span>
            <span>Sophie Super Admin</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-600">Email address:</span>
            <span>sophiesuperad@gmail.com</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-600">Phone number:</span>
            <span>+234 8043035200</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-600">Role:</span>
            <span>Super Admin</span>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold text-gray-600">Change password:</span>
            <span>****SuperAdmin****</span>
          </div>
        </div>
      </div>

      {/* Manage Admins Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Manage admins</h3>
        <div className="space-y-4 text-sm">
          <div className="flex gap-4">
            <span className="font-semibold">Sophie</span>
            <button className="text-red-500 hover:underline">Remove</button>
            <button className="text-blue-500 hover:underline">Allocate new duties</button>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Zak</span>
            <button className="text-red-500 hover:underline">Remove</button>
            <button className="text-blue-500 hover:underline">Allocate new duties</button>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Oyinkansola</span>
            <button className="text-red-500 hover:underline">Remove</button>
            <button className="text-blue-500 hover:underline">Allocate new duties</button>
          </div>
          <div className="flex gap-4">
            <span className="font-semibold">Tolu</span>
            <button className="text-red-500 hover:underline">Remove</button>
            <button className="text-blue-500 hover:underline">Allocate new duties</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
