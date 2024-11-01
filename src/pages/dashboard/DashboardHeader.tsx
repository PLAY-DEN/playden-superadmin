
const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome back, <span style={{color: "#8F55A2"}}>Sophie!</span></h1>
        <div className="flex items-center">
        <select
                    name="admin"
                    id="options"
                    className="text-xs w-32 h-8px-3 border border-playden-primary border-opacity-40 rounded-md"
                    style={{backgroundColor: "#8F55A224", color: "#41244B"}}
                >
                    <option value="days">last 30 days</option>
                    <option value="days">29</option>
                    <option value="days">28</option>
                    <option value="days">27</option>
                    <option value="days">26</option>
                    <option value="days">25</option>
                    <option value="days">24</option>
                    <option value="days">23</option>
                    <option value="days">22</option>
                    <option value="days">21</option>
                    <option value="days">20</option>
                </select>
        </div>
    </div>
);
};

export default DashboardHeader;
             
