import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type SearchBoxProps = {
    onSearch?: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBoxProps) {
    const [query, setQuery] = React.useState("");

    const submit = async () => {
        const q = query.trim();
        if (!q) return;
        onSearch?.(q);
    };

    return (
        <div className="absolute top-18 left-20 z-[1000] w-full max-w-sm p-1 flex items-center gap-2">

            <Input
                className="flex-1 h-11 rounded-full border-none bg-white text-slate-900 shadow-md placeholder:text-slate-400 px-5 focus-visible:ring-2 focus-visible:ring-blue-100"
                placeholder="Search CtrlF(ood)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
            />

            <Button
                size="icon"
                className="h-11 w-11 shrink-0 rounded-full bg-white hover:bg-slate-300 text-blue-500 shadow-md"
                onClick={submit}
            >
                <Search className="h-5 w-5" />
            </Button>

        </div>
    );
}