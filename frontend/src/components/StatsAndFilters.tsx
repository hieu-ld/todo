import { FILTER_LABELS, type Filter, type FilterType } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter as Filtericon } from "lucide-react";




const StatsAndFilters = ({completedTasksCount = 0, activeTasksCount = 0, filter = "all", setFilter = ()=> {}}: FilterType) => {

    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* phần thống kê */}
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-(--text-warm) border-(--border-color)"
                >
                    {activeTasksCount} {FILTER_LABELS.active}
                </Badge>

                <Badge
                    variant="secondary"
                    className="bg-white/50 text-(--text-success) border-(--border-color)"
                >
                    {completedTasksCount} {FILTER_LABELS.completed}
                </Badge>
            </div>

            {/* phần filter */}
            <div className="flex flex-col gap-2 sm:flex-row">
                {
                    (Object.keys(FILTER_LABELS) as Filter[]).map((type) => (
                        <Button
                            key={type}
                            variant={filter === type ? 'gradient' : 'ghosted'}
                            size='sm'
                            className="capitalize cursor-pointer"
                            onClick={() => setFilter(type)}
                        >
                            <Filtericon className="size-4"/>
                            {FILTER_LABELS[type]}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default StatsAndFilters;
