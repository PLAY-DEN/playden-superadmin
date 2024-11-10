import { profileImage } from "../assets/images";

interface SettingHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingHeader: React.FC<SettingHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
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
      <div className="flex flex-row justify-between mt-20">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`${
              activeTab === 'account' ? 'bg-[#8F55A2]' : 'bg-[#41244B]'
            } text-white py-2 px-6 w-[220px] h-[45px] rounded-md font-semibold`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`${
              activeTab === 'system' ? 'bg-[#8F55A2]' : 'bg-[#41244B]'
            } text-white py-2 px-6 w-[220px] h-[45px] rounded-md font-semibold`}
          >
            System Settings
          </button>
        </div>
        <img src={profileImage} alt="Profile" className="w-[150px] h-[150px] mt-5" />
      </div>
    </div>
  );
};

export default SettingHeader;
