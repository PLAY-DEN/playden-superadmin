import { page } from "../../assets/images";

const TaskDetails: React.FC = () => {
    return (
        <div className="h-[159px] min-w-[400px] bg-[#D097B7] rounded-xl text-playden-primary font-bold">
            <div className="flex flex-row justify-between items-center p-5">
                <p className="text-sm">Task not finished</p>
                <img src={page} alt="page" className="h-10 w-8" />
            </div>
            <h1 className="ml-16 text-xl mt-[-15px]">20</h1>
            <h1 className="ml-8 text-sm font-semibold">Complete task</h1>
            <div className="w-80 bg-[#8F55A247] rounded-full h-[6px] ml-9 mt-3">
                <div className="h-2 rounded-full bg-[#3A1A5B]" style={{ width: '70%' }}></div>
            </div>
        </div>
    );
};

export default TaskDetails;
