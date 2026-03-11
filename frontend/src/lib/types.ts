

// filter
export type Filter = "all" | "active" | "completed";

export interface FilterType {
    completedTasksCount?: number;
    activeTasksCount?: number;
    filter?: Filter;
    setFilter?: (filter: Filter) => void;
}

export const FILTER_LABELS: Record<Filter, string> = {
    all: "Tất cả",
    active: "Đang làm",
    completed: "Hoàn thành",
};

// Task - "nhìn" vào schema backend rồi viết lại tương đương
export interface Task {
    _id: string;
    title: string;
    status: "active" | "completed";  // enum bên backend
    completedAt?: Date | null;        // default null bên backend
    createdAt: Date;                 // tự động có vì timestamps: true
    updatedAt: Date;                 // tự động có vì timestamps: true
}

// filter Date
export interface OptionProps {
    label: string;
    value: string;
}

export const DateOptions: OptionProps[] = [
    { label: "Tất cả", value: "all" },
    { label: "Hôm nay", value: "today" },
    { label: "Tuần này", value: "week" },
    { label: "Tháng này", value: "month" },
]

export interface DateProps {
    dateQuery: string;
    setDateQuery: (value: string) => void;
}


// pagination
export const visibleTaskLimit = 4;

export interface TaskPaginationProps {
    handleNext: () => void;
    handlePrev: () => void;
    handlePageChange: (newPage: number) => void; // nhận số trang
    page: number;
    totalPages: number;
}
