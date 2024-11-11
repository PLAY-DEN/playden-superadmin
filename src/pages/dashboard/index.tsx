import { Ellipse, vector12, Chart } from '../../assets/images';
import DashboardHeader from './DashboardHeader';
import StatisticsSummary from './StatisticsSummary';
import PitchProgress from './pitchProgress';
import PlayDenStats from './playDen';
import TaskDetails from './taskDetails';

const Dashboard: React.FC = () => {
    return (
        <div className="relative ml-72 p-8" style={{ minHeight: '100vh' }}>
            <div
                className="fixed inset-0 ml-72 mt-20 p-8"
                style={{ backgroundColor: '#F7F7F7', width: 'calc(100% - 18rem)' }}
            >
                <DashboardHeader />

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                    {/* <div className="ml-[-10px]"> */}
                    <StatisticsSummary
                        title="Total Revenue"
                        value="₦10,000,000.00"
                        colorClass="text-white"
                        customStyle={{
                            backgroundColor: "#6C6C6C",
                            border: "2px solid #6C6C6C",
                            borderRadius: "8px",
                        }}
                        imageSrc={Ellipse}
                        imageStyle={{ filter: 'invert(15%) sepia(5%) saturate(300%) hue-rotate(0deg) brightness(60%)' }}
                        secondaryImageSrc={vector12}
                        secondaryImageStyle={{ fontWeight: 'bold' }}
                    />
                    {/* </div> */}
                    {/* <div className="ml-[-30px]"> */}
                    <StatisticsSummary
                        title="Total Commission"
                        value="3,000"
                        colorClass="text-white"
                        customStyle={{
                            backgroundColor: "#01031A",
                            border: "2px solid #01031A",
                            borderRadius: "8px",
                        }}
                        imageSrc={Ellipse}
                        imageStyle={{ filter: 'sepia(1) saturate(600%) hue-rotate(180deg) brightness(25%)' }}
                        tertiaryImageSrc={Chart}
                        tertiaryImageStyle={{ fontWeight: 'bold' }}
                    />
                    {/* </div> */}

                    {/* PlayDenStats with TaskDetails below */}
                    <div className="ml[-45px]">
                        <PlayDenStats />
                        <div className="mt-52">
                            <TaskDetails />
                        </div>
                    </div>
                </div>

                {/* Pitch Progress Displayed Directly Under the Summary Cards */}
                <div className="mt-[-400px] grid grid-cols-3">
                    <div className="col-span-2 pr-2">
                        <PitchProgress />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
