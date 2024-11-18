import React, { useState } from 'react';
import SettingHeader from '../../components/settingHeader';
import AccountSetting from '../../components/accountsetting';
import SystemSettings from '../../components/systemsettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="p-8 mt-20 ml-72">
      {/* SettingHeader component with toggle functionality */}
      <SettingHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditional rendering based on active tab */}
      <div className="pt-5">
        {activeTab === 'account' ? <AccountSetting /> : <SystemSettings />}
      </div>
    </div>
  );
};

export default Settings;
