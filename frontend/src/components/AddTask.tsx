import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";


interface AddTaskProps {
    handleNewTaskAdded: () => void;
}


const AddTask = ({handleNewTaskAdded}: AddTaskProps) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if(newTaskTitle.trim()) {
            try {
                await api.post("/tasks", {title: newTaskTitle});
                toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm.`);
                handleNewTaskAdded();
            } catch (error) {
                console.error("Lỗi khi thêm Tasks: ", error);
                toast.error("Lỗi khi thêm Tasks");
            }
            setNewTaskTitle("");
        } else {
            toast.error("Bạn cần nhập nội dung nhiệm vụ");
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    
    return (
        <Card className="p-6 border-0">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input 
                    type="text"
                    placeholder="Cần phải làm gì?"
                    className="h-11 text-base bg-slate-50 sm:flex-1 focus:border-0"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyUp={handleKeyPress}
                />

                <Button 
                    variant="gradient"
                    size="xl"
                    className="px-6 cursor-pointer"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5" />
                    Thêm
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;
