import { pitchImg } from "../../assets/images";

interface Pitch {
    imageSrc: string;
    name: string;
    sport: string;
    progress: number;
}

const pitches: Pitch[] = [
    { imageSrc: pitchImg, name: "Plutous Pitch 1", sport: "Football 4 x 4", progress: 65 },
    { imageSrc: pitchImg, name: "Plutous Pitch 2", sport: "Football 4 x 4", progress: 83 },
    { imageSrc: pitchImg, name: "Plutous Pitch 3", sport: "Football 4 x 4", progress: 47 },
    { imageSrc: pitchImg, name: "Plutous Pitch 4", sport: "Football 4 x 4", progress: 71 },
    { imageSrc: pitchImg, name: "Plutous Pitch 5", sport: "Football 4 x 4", progress: 71 },
];

const PitchProgress: React.FC = () => {
    return (
        <div className="bg-white shadow-md minw-[630px] w-full rounded-lg h-[457px] pb-12 mb-10">
            <div className="flex flex-row p-3 justify-between mb-3">
                <div>
                     <h2 className="text-xl font-bold">Pitch Progress</h2>
                     <span className="text-[#A1A5B7] text-xs">890,344 Sales</span>
                </div>
                <select
                    name="user"
                    id="options"
                    className="text-xs text-[#A1A5B7] w-24 h-8 border border-none bg-transparent rounded-md"
                >
                    <option value="days">All Uses</option>
                </select>
            </div>
            <div className="flex flex-row  justify-between px-10">
                  <span className="text-[#A1A5B7] text-xs">PITCH</span>  
                  <span className="text-[#A1A5B7] text-xs">SPORT/PITCH SIZE</span>
                  <span className="text-[#A1A5B7] text-xs">PROGRESS</span>
                  <span className="text-[#A1A5B7] text-xs">ACTION</span>
            </div>
            <div className="grid grid-cols-1 space-y-3">
                {pitches.map((pitch, index) => (
                    <div key={index} className="flex items-center justify-between p-2 pr-10 bg-gray-100 roundedlg">
                        <div className="flex items-center">
                            <img src={pitch.imageSrc} alt={pitch.name} className="w-12 h-12 rounded-full mr-2" />
                            <p>{pitch.name}</p>
                        </div>
                        <div> 
                            <span>{pitch.sport}</span>
                         </div>
                         <div className="w-32 bg-gray-300 rounded-full h-2">
                            <div className="h-2 rounded-full bg-[#3A1A5B]" style={{ width: `${pitch.progress}%` }}></div>
                        </div>
                             <button className="bg-[#3A1A5B] text-white px-3 py-1 rounded-md">View</button>
                    </div>
                  ))}
            </div>
        </div>
    );
};

export default PitchProgress;
