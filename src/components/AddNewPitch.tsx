import { pitchPic2 } from "../assets/images";

const AddNewPitch: React.FC = () => {
  return (
    <div className="rounded-lg shadow-md mt-20 relative ml-72 p-8">
      <div className="flex flex-row justify-between">
           <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Listing</h2>
           <select
                    name="days"
                    id="options"
                    className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
                  >
                    <option value="days">last 30 days</option>
              </select>
      </div>
      <div className="bg-white w-[1017px] h-[560px] mt-20">
        <h1 className="text-lg font-semibold"> Plutous cluchouse field </h1>
        <div className="flex flex-row justify-between mt-10">
             <img src={pitchPic2} alt="Pitch" className="rounded-lg w-[306px] h-[223px] object-cover" />
             <div className="text-xs text-[#333543]">
                   <h3 className="text-lg font-semibold mt-[-20px]">Pitch Details</h3>
                  <div className="flex flex-col gap-4">
                      <p>Pitch size: <span className="ml-20">2,377 kilometers</span></p>
                      <p>pitch Sport: <select name="sport" id="options" className="bg-playden-primary text-white w-[100px] h-[20 rounded-lg font-[10px] ml-20"><option value="sports">Football</option></select></p>
                      <p> Pitch address: <span className="ml-20"> plutous club house U/Rimi Kaduna </span></p>
                      <p>Pitch prize: <select name="sport" id="options" className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg font-[10px] ml-20"><option value="sports">10,000/hrs</option></select></p>
                      <p>Pitch opening hrs: <span className="ml-20">7:00am</span></p>
                      <p>Pitch closing hrs: <span className="ml-20">10:00am</span></p>
                  </div>
             </div>
             <div className="text-xs text-[#333543]">
              <p>Pitch manager: <span className="ml-20">Ahmed salisu</span></p>
              <p>Pitch manager number: <span className="ml-20">08034763911</span></p>
              <p>Pitch owner: <select name="sport" id="options" className="bg-playden-primary text-white w-[100px] h-[20px] mt-5 rounded-lg text-[10px]"><option value="sports">david jim</option></select></p>
              <p>Pitch amenities: <select name="sport" id="options" className="bg-playden-primary text-white w-[100px] h-[20px] mt-5 rounded-lg text-[10px]"><option value="sports">nills</option></select></p>
              <p>Pitch facilities: <select name="sport" id="options" className="bg-playden-primary text-white w-[100px] h-[20px] mt-5 rounded-lg text-[10px]"><option value="sports">cones</option></select></p>
             </div>
        </div>
        <button className="bg-playden-primary text-white">save</button>
      </div>
    </div>  
  );
};

export default AddNewPitch;
