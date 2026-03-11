import type { Filter, Task } from "@/lib/types";
import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";


interface TaskProps {
    filterTasks: Task[];
    filter: Filter;
    handleTaskChanged: () => void;
}


const TaskList = ({filterTasks, filter, handleTaskChanged}: TaskProps) => {

    if (!filterTasks || filterTasks.length === 0) {
        return <TaskEmptyState filter = {filter} />
    }
    
    return (
        <div className="space-y-3">
            {filterTasks.map((task, index) => (
                <TaskCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                    handleTaskChanged={handleTaskChanged}
                />
            ))}
        </div>
    );
};

export default TaskList;
