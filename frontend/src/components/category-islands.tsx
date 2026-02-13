"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    ArrowLeftIcon,
    ArchiveIcon,
    FlagIcon,
    ClockIcon,
    UtensilsIcon,
} from "lucide-react"

export function CategoryIslands() {
    return (
        <div className="absolute top-5 left-180 z-[1000] flex items-center py-2">

            <div className="flex gap-2 px-1">
                <Button
                    variant="outline"
                    className="h-7 rounded-full px-4 bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-stone-500"
                >
                    <UtensilsIcon className="w-4 h-4 mr-2" />
                    Test1
                </Button>

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