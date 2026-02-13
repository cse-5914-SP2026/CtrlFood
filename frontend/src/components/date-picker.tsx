import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="absolute top-5 left-80 z-[1000] p-1 rounded-xl">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="default"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[1000]" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
