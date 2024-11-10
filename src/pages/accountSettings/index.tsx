import React, { useState } from 'react';
import SettingHeader from '../../components/settingHeader';
import AccountSetting from '../../components/accountsetting';
import SystemSettings from '../../components/systemsettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-20 ml-72">
      {/* SettingHeader component with toggle functionality */}
      <SettingHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional rendering based on active tab */}
      {activeTab === 'account' ? <AccountSetting /> : <SystemSettings />}
    </div>
  );
};

export default Settings;
