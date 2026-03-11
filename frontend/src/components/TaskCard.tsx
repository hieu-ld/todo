import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import type { Task } from "@/lib/types";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";


interface TaskCardProps {
    task: Task;
    index: number;
    handleTaskChanged: () => void;
}


const TaskCard = ({ task, index, handleTaskChanged }: TaskCardProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");


    const deleteTask = async (taskID: string) => {
        try {
            await api.delete(`/tasks/${taskID}`);
            toast.success(`Nhiệm vụ ${task.title} đã được xóa.`);
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi xóa Tasks: ", error);
            toast.error("Lỗi khi xóa Tasks");
        }
    }

    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {title: updateTaskTitle});
            toast.success(`Nhiệm vụ ${task.title} đã được cập nhật thành ${updateTaskTitle}.`);
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi cập nhật Tasks: ", error);
            toast.error("Lỗi khi cập nhật Tasks");
        }
    }

    const toggleTaskCompleted = async () => {
        try {
            if (task.status === "active") {
                await api.put(`/tasks/${task._id}`, {
                    status: "completed",
                    completedAt: new Date().toISOString(),
                });
                toast.success(`Nhiệm vụ ${task.title} đã được hoàn thành.`);
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: "active",
                    completedAt: null,
                });
                toast.success(`Nhiệm vụ ${task.title} đã được đổi sang chưa hoàn thành.`);
            }
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi khi cập nhật Tasks: ", error);
            toast.error("Lỗi khi cập nhật Tasks");
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTask();
        }
    }

    return (
        <Card className={cn(
            "p-4 border-0 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in group",
            task.status === "completed" && "opacity-75"
        )}
            style={{animationDelay: `${index*50}`}}
        >
            <div className="flex items-center gap-4">
                {/* nút tròn */}
                <Button
                    variant="ghosted"
                    size="icon"
                    className={cn(
                        "shrink-0 size-8 rounded-full transition-all duration-300",
                        task.status === "completed" ? "text-(--text-success) hover:text-(--text-success)/80" : "text-(--text-warm) hover:text-(--text-warm)/80"
                    )}
                    onClick={toggleTaskCompleted}
                >
                    {task.status === "completed" ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                {/* hiển thị hoặc chỉnh sửa */}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input 
                            placeholder="Cần phải làm gì?"
                            className="flex-1 h-11 text-base"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyUp={handleKeyPress}
                            onBlur={() => {
                                setIsEditting(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-300",
                            task.status === "completed" ? "text-(--text-warm) line-through" : "text-(--text-warm))"
                        )}>
                            {task.title}
                        </p>
                    )}

                    {/* ngày tạo & ngày hoàn thành */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-(--text-warm)" />
                        <span className="text-xs text-(--text-warm)">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-(--text-warm)"> - </span>
                                <Calendar className="size-3 text-(--text-warm)" />
                                <span className="text-xs text-(--text-warm)">
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* nút chỉnh sửa và xóa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* nut edit */}
                    <Button
                        variant="ghosted"
                        size="icon"
                        className="shrink-0 transition-colors size-8 cursor-pointer"
                        onClick={() => {
                            setIsEditting(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    {/* nut delete*/}
                    <Button
                        variant="ghosted"
                        size="icon"
                        className="shrink-0 transition-colors size-8 cursor-pointer"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;
