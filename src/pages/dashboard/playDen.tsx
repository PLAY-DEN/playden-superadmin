import { vector6, person, equalizer, compiling } from "../../assets/images";

interface StatCardProps {
    title: string;
    value: number;
    icon?: string; 
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-white text-end rounded-lg p-4 w-52 h-24 shadow-sm relative">
            {/* Display icon at top-right of the card */}
            {icon && <img src={icon} alt={`${title} icon`} className="absolute top-2 left-2 w-6 h-6" />}
            <p style={{ color: '#41244B', position: 'absolute', bottom: '20px', right: '10px' }} className="text-xs font-bold">{value}</p>
            <p style={{ color: '#41244B', position: 'absolute', bottom: '5px', right: '5px' }} className="text-[12px]">{title}</p>
        </div>
    );
};

const PlayDenStats: React.FC = () => {
    return (
        <div
            className="bg-playden-primary rounded-lg p-5 flex flex-col items-center"
            style={{ minWidth: '400px', height: '242px' }}
        >
            {/* Header Section */}
            <div className="flex justify-between w-full">
                <h2 className="text-sm text-white font-semibold">PlayDen Stat</h2>
                <select
                    name="admin"
                    id="options"
                    className="text-xs text-white w-24 h-8 border border-none bg-transparent rounded-md"
                >
                    <option value="days">Exports</option>
                </select>
            </div>

            {/* Image Section */}
            <img src={vector6} alt="chart" className="mt-14 mx-auto" />

            {/* Stat Cards Section */}
            <div className="grid grid-cols-2 gap-3 mt-8 justify-center">
                <StatCard title="Total Booking" value={1000} icon={equalizer} />
                <StatCard title="Total Users" value={1000} icon={person} />
                <StatCard title="Total Pitch" value={1000} icon={compiling} />
                <StatCard title="New Users" value={1000} icon={person} />
            </div>
        </div>
    );
};

export default PlayDenStats;
