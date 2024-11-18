import Select from "./forms/select";

const SystemSettings: React.FC = () => {
  return (
    <div className="mt-14">
      {/* Shared Header Component */}
      {/* 
Adjust Play points:

*/}
      <div className="space-y-8">
        {/* Example Sliders as shown in Figma */}
        <div className="flex gap-2 flex-col">
          <span className=" font-semibold">
            Adjust Play points
          </span>
          <div className="flex gap-2 items-center">
            <span>0</span>
            <input
              type="range"
              min="0"
              max="10000"
              defaultValue="5000"
              className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range"
            />
            <span>10,000</span>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <span className=" font-semibold">Adjust revenue percentage</span>
          <div className="flex gap-2 items-center">
            <span>0</span>
            <input
              type="range"
              min="0"
              max="10000"
              defaultValue="5000"
              className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range"
            />
            <span>10,000</span>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p className=" font-semibold">App updated</p>

          <Select options={[
            { value: "updates", label: "Adjust app " },
            { value: "updates", label: "Adjust updates " },
          ]} value={""} setValue={() => { }}
            className="py-2 w-[444px]">

          </Select>
        </div>

        <div className="flex gap-2 flex-col">
          <span className=" font-semibold">
            Adjust limits on bookings
          </span>
          <div className="flex gap-2 items-center">
            <span>0</span>
            <input
              type="range"
              min="0"
              max="10000"
              defaultValue="5000"
              className="w-[444px] bg-[#01031A] appearance-none h-1 rounded-lg custom range"
            />
            <span>10,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
