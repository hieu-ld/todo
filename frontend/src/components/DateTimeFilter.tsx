import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateOptions, type DateProps } from "@/lib/types";



export function DateTimeFilter({ dateQuery, setDateQuery }: DateProps) {

    return (
        <Select defaultValue="all" value={dateQuery} onValueChange={setDateQuery}>
            <SelectTrigger className="w-45">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
                {DateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default DateTimeFilter;
