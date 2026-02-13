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
        <div className="absolute top-5 left-20 z-[1000] p-1 rounded-xl">
            <div className="flex items-center w-full max-w-sm rounded-full border border-input bg-background px-1 shadow-sm focus-within:ring-1 focus-within:ring-ring">                <Input
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                placeholder="Search CtrlF(ood)"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
            />
                <Button variant="ghost" size="icon" className="h-8 px-4 text-sm rounded-xl" onClick={submit}>
                    <Search className="h-4 w-4 text-blue-400" />
                </Button>
            </div>
        </div >
    );
}
