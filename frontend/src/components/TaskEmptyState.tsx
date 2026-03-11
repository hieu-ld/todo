import { Circle } from "lucide-react";
import { Card } from "./ui/card";
import type { Filter } from "@/lib/types";




const TaskEmptyState = ({ filter }: { filter: Filter}) => {
    return (
        <Card className="p-8 text-center border-0 shadow-md">
            <div className="space-y-3">
                <Circle className="size-12 mx-auto" />

                <div>
                    <h3 className="font-medium">
                        {
                            filter === "active" ?
                            "Không có nhiệm vụ nào đang làm." :
                            filter === "completed" ?
                            "Không có nhiệm vụ nào đã hoàn thành." :
                            "Không có nhiệm vụ nào."
                        }
                    </h3>

                    <p className="text-sm">
                        {
                            filter === "all" ?
                            "Thêm nhiệm vụ đầu tiên để bắt đầu!" :
                            `Chuyển sang "tất cả" để xem tất cả các nhiệm vụ ${filter === "active" ? "đã hoàn thành" : "đang làm"}.`
                        }
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TaskEmptyState;
