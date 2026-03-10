"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    ArrowLeftIcon,
    ArchiveIcon,
    FlagIcon,
    ClockIcon,
    UtensilsIcon,
    ChevronDownIcon,
} from "lucide-react"

const FOOD_LOCATIONS = ["12th-avenue-bread-company", 
    "berry-cafe", 
    "cafe-carmenton", 
    "cfaes-cafe",
    "connecting-grounds",
    "courtside-cafe", 
    "crane-cafe", 
    "curl-market", 
    "espressoh", 
    "hamilton-cafe", 
    "juice-2", 
    "juice-north", 
    "ksa-cafe", 
    "marketplace", 
    "marketplace-c-store", 
    "mirror-lake-eatery", 
    "oxleys-to-go", 
    "oxleys-by-the-numbers", 
    "postle-cafe", 
    "sloopys-diner", 
    "terra-byte-cafe", 
    "the-caffeine-element", 
    "the-campus-grind-mcpherson", 
    "the-coffey-road-cafe-at-vet-med", 
    "union-market", 
    "woodys-tavern"]

export function CategoryIslands() {
    const [selected, setSelected] = React.useState<string[]>([])

    const toggle = (option: string) => {
        setSelected(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        )
    }
    return (
        <div className="absolute top-17 left-180 z-[1000] flex items-center py-2">
            <div className="flex gap-2 px-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-7 rounded-full px-4 bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-stone-500"
                        >
                            <UtensilsIcon className="w-4 h-4 mr-2" />
                            {selected.length > 0 ? `${selected.length} selected` : "Test1"}
                            <ChevronDownIcon className="w-3 h-3 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 z-[2000]">
                        {FOOD_LOCATIONS.map(option => (
                            <DropdownMenuCheckboxItem
                                key={option}
                                checked={selected.includes(option)}
                                onCheckedChange={() => toggle(option)}
                                onSelect={e => e.preventDefault()}
                            >
                                {option}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="outline"
                    className="h-7 rounded-full px-4 bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-stone-500"
                >
                    <ArchiveIcon className="w-4 h-4 mr-2" />
                    Test1
                </Button>

                <Button
                    variant="outline"
                    className="h-7 rounded-full px-4 bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-stone-500"
                >
                    <FlagIcon className="w-4 h-4 mr-2" />
                    Test1
                </Button>

                <Button
                    variant="outline"
                    className="h-7 rounded-full px-4 bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-stone-500"
                >
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Test1
                </Button>
            </div>
        </div>
    )
}