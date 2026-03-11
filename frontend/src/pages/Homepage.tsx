import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskPagination from "@/components/TaskPagination";
import api from "@/lib/axios";
import { type Task, type Filter, visibleTaskLimit } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";




const Homepage = () => {
    const [taskBuffer, setTaskBuffer] = useState<Task[]>([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [filter, setFilter] = useState<Filter>("all");
    const [dateQuery, setDateQuery] = useState("today");
    const [page, setPage] = useState(1);

    const fetchTasks = useCallback(async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks ?? []);
            setActiveTaskCount(res.data.activeCount);
            setCompletedTaskCount(res.data.completedCount);
        } catch (error) {
            console.error("Lỗi khi truy xuất Tasks: ", error);
            toast.error("Lỗi khi truy xuất Tasks");
        }
    }, [dateQuery]);

    useEffect(() => {
        const initFetch = async () => {
            await fetchTasks();            
        }
        initFetch();
    }, [fetchTasks]);


    // logic filter
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "completed";
            default:
                return true;
        }
    });

    const handleTaskChange = () => {
        fetchTasks();
    }

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
        setPage(1); // chỉ reset khi đổi filter
    }

    const handleDateChange = (newDate: string) => {
        setDateQuery(newDate);
        setPage(1); // chỉ reset khi đổi date
    }

    // logic pagination
    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
    const safePage = Math.min(page, Math.max(1, totalPages));

    const visibleTasks = filteredTasks.slice(
        (safePage - 1) * visibleTaskLimit,
        safePage * visibleTaskLimit
    );

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    return (
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            {/* đầu trang */}
            <Header />

            {/* tạo nhiệm vụ */}
            <AddTask 
                handleNewTaskAdded={handleTaskChange}
            />

            {/* thống kê - bộ lọc */}
            <StatsAndFilters 
                activeTasksCount={activeTaskCount}
                completedTasksCount={completedTaskCount}
                filter={filter}
                setFilter={handleFilterChange}
            />

            {/* danh sách nhiệm vụ */}
            <TaskList 
                filterTasks={visibleTasks} 
                filter={filter}
                handleTaskChanged={handleTaskChange}
            />

            {/* phân trang - lọc theo date */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <TaskPagination 
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    handlePageChange={handlePageChange}
                    page={safePage}
                    totalPages={totalPages}
                />
                <DateTimeFilter 
                    dateQuery={dateQuery}
                    setDateQuery={handleDateChange}
                />
            </div>

            {/* chân trang */}
            <Footer 
                activeTasksCount={activeTaskCount}
                completedTasksCount={completedTaskCount}
            />
        </div>
    );
};

export default Homepage;