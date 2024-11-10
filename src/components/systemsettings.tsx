
const SystemSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-[-80px]">
      {/* Shared Header Component */}

        <div className="space-y-6">
          {/* Example Sliders as shown in Figma */}
          <div className="flex gap-2">
            <span className="text-[#000000] font-semibold">Adjust Playpoints:</span>
            <input
                type="range"
                min="0"
                max="10000"
                defaultValue="5000"
                className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range"
                style={{
                background: `#01031A`,
                }}
            />
            <span>10,000</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#000000] font-semibold">Adjust revenue percentage:</span>
            <input type="range" min="0" max="10000" defaultValue="5000" className="w-[444px] text-[#01031A]" />
            <span>10,000</span>
          </div>
          {/* Additional sliders and other settings as shown in your design */}
        </div>
      </div>
  );
};

export default SystemSettings;
