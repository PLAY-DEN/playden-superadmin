import React from 'react';
// import SettingHeader from '../../components/settingHeader';
import AccountSetting from '../../components/accountsetting';
// import SystemSettings from '../../components/systemsettings';

const Settings: React.FC = () => {
  // const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="bg-white p-8 rounded-lg mb-20">
      {/* SettingHeader component with toggle functionality */}
      {/* <SettingHeader activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      {/* Conditional rendering based on active tab */}
      <div className="">
        <AccountSetting />
        {/* {activeTab === 'account' ? <AccountSetting /> : <SystemSettings />} */}
      </div>
    </div>
  );
};

export default Settings;
