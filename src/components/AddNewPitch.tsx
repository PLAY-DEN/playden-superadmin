import { pitchPic2 } from "../assets/images";

const AddNewPitch: React.FC = () => {
  return (
    <div className="mt-20 relative ml-72 p-8">
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Pitch Listing</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 days</option>
        </select>
      </div>

      {/* Main Content Section */}
      <div className="bg-white w-[1017px] p-6 rounded-md shadow-md">
        <h1 className="text-lg font-semibold mb-4">Plutus Clubhouse Field</h1>

        <div className="flex">
          {/* Image Section */}
          <img src={pitchPic2} alt="Pitch" className="rounded-lg w-[306px] h-[223px] object-cover mt-10" />

          {/* Tables Section */}
          <div className="flex w-full justify-between ml-8">
            {/* First Table */}
            <table className="w-1/2 text-left text-xs text-[#333543] border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg font-semibold text-left pb-2 pt-5">Pitch Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Pitch Size:</td>
                  <td>2,377 kilometers</td>
                </tr>
                <tr>
                  <td className="font-semibold">Pitch Sport:</td>
                  <td>
                    <select className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg">
                      <option value="sports">Football</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Pitch Address:</td>
                  <td>Plutus Clubhouse, U/Rimi, Kaduna</td>
                </tr>
                <tr>
                  <td className="font-semibold">Pitch Price:</td>
                  <td>
                    <select className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg">
                      <option value="price">10,000/hr</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Opening Hours:</td>
                  <td>7:00 AM</td>
                </tr>
                <tr>
                  <td className="font-semibold">Closing Hours:</td>
                  <td>10:00 PM</td>
                </tr>
              </tbody>
            </table>

            {/* Second Table */}
            <table className="w-1/2 text-left text-xs text-[#333543] border-separate border-spacing-y-2 ml-8 mt-12">
              <tbody>
                <tr>
                  <td className="font-semibold">Pitch Manager:</td>
                  <td>Ahmed Salisu</td>
                </tr>
                <tr>
                  <td className="font-semibold">Manager Contact:</td>
                  <td>08034763911</td>
                </tr>
                <tr>
                  <td className="font-semibold">Pitch Owner:</td>
                  <td>
                    <select className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg">
                      <option value="owner">David Jim</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Amenities:</td>
                  <td>
                    <select className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg">
                      <option value="amenities">Nills</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Facilities:</td>
                  <td>
                    <select className="bg-playden-primary text-white w-[100px] h-[20px] rounded-lg">
                      <option value="facilities">Cones</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-5">
          <button className="bg-playden-primary text-white py-2 px-16 rounded-lg text-sm font-semibold ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPitch;
