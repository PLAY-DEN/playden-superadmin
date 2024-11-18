import { pitchPic2 } from "../assets/images";
import FileUploadComponent from "./FileUploadComponent";
import Select from "./forms/select";

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
      <div className="p-6">
        <h1 className="text-lg  mb-4">Plutus Clubhouse Field</h1>

        <div className="flex flex-col">
          {/* Image Section */}

          {/* Tables Section */}
          <div className="flex w-full justify-between ml8">
            {/* First Table */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg  text-left pb-2 pt-5">Pitch Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">Pitch Size:</td>
                  <td>2,377 kilometers</td>
                </tr>
                <tr>
                  <td className="">Pitch Sport:</td>
                  <td>
                    <Select options={[
                      { value: "updates", label: "Adjust app " },
                      { value: "updates", label: "Adjust updates " },
                    ]} value={""} setValue={() => { }}
                      className="!py-1 ">

                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="">Pitch Address:</td>
                  <td>Plutus Clubhouse, U/Rimi, Kaduna</td>
                </tr>
                <tr>
                  <td className="">Pitch Price:</td>
                  <td>
                    <Select options={[
                      { value: "updates", label: "Adjust app " },
                      { value: "updates", label: "Adjust updates " },
                    ]} value={""} setValue={() => { }}
                      className="!py-1 ">

                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="">Opening Hours:</td>
                  <td>7:00 AM</td>
                </tr>
                <tr>
                  <td className="">Closing Hours:</td>
                  <td>10:00 PM</td>
                </tr>
              </tbody>
            </table>

            {/* Second Table */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2 ml-8 mt-12">
              <tbody>
                <tr>
                  <td className="">Pitch Manager:</td>
                  <td>Ahmed Salisu</td>
                </tr>
                <tr>
                  <td className="">Manager Contact:</td>
                  <td>08034763911</td>
                </tr>
                <tr>
                  <td className="">Pitch Owner:</td>
                  <td>
                    <Select options={[
                      { value: "updates", label: "Adjust app " },
                      { value: "updates", label: "Adjust updates " },
                    ]} value={""} setValue={() => { }}
                      className="!py-1 ">

                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="">Amenities:</td>
                  <td>
                    <Select options={[
                      { value: "updates", label: "Adjust app " },
                      { value: "updates", label: "Adjust updates " },
                    ]} value={""} setValue={() => { }}
                      className="!py-1 ">

                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="">Facilities:</td>
                  <td>
                    <Select options={[
                      { value: "updates", label: "Adjust app " },
                      { value: "updates", label: "Adjust updates " },
                    ]} value={""} setValue={() => { }}
                      className="!py-1 ">

                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <FileUploadComponent onFileUpload={() => { }} error={null} />
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-5">
          <button className="bg-playden-primary text-white py-2 px-16 rounded-lg  ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPitch;
