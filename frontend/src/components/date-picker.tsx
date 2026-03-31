import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { filterStore } from "@/store/store"

// Note!!! the calendar compoennt was liek fucked up idk why
// saw this issue on gh https://github.com/shadcn-ui/ui/issues/1574
// and c&p a new calendar comp code to calendar comp so that code is now custom FYI

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()
    const setSelectedDate = filterStore((state) => state.setSelectedDate)

    const handleSelect = (d: Date | undefined) => {
        setDate(d)
        // Backend expects ISO date format YYYY-MM-DD (from date.today().isoformat())
        setSelectedDate(d ? format(d, "yyyy-MM-dd") : null)
    }

    return (
        <div className="rounded-xl">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[1000] bg-white text-slate-900" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
