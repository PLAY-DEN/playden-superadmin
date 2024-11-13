
const SystemSettings: React.FC = () => {
  return (
    <div className="mt-14">
      {/* Shared Header Component */}

        <div className="space-y-8">
          {/* Example Sliders as shown in Figma */}
          <div className="flex gap-2">
            <span className="text-[#000000] font-semibold">Adjust Playpoints: 0</span>
            <input
                type="range"
                min="0"
                max="10000"
                defaultValue="5000"
                className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range mt-3"     
            />
            <span>10,000</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#000000] font-semibold">Adjust revenue percentage: 0</span>
            <input
                 type="range" 
                 min="0" 
                 max="10000" 
                 defaultValue="5000" 
                 className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range mt-2" 
              />
            <span>10,000</span>
          </div>
          <div>
             <select name="updates" id="option" className="text-[#000000] font-semibold bg-transparent border border-none">
                 <option value="updates">Adjust app / updates</option>
              </select>
              <p className="text-[#000000] font-semibold">App updated</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[#000000] font-semibold">Adjust limits on bookings: 0</span>
            <input
                 type="range" 
                 min="0" 
                 max="10000" 
                 defaultValue="5000" 
                 className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range mt-2" 
              />
            <span>10,000</span>
          </div>       
        </div>
      </div>
  );
};

export default SystemSettings;
