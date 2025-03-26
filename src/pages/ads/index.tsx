import React from "react";
import AdsForm from "../../components/adsForm";
import AdsList from "../../components/adsList";

const Ads: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg space-y-5">
      <AdsForm />
      <AdsList />
    </div>
  );
};

export default Ads;
