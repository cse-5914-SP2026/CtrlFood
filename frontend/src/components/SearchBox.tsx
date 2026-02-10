import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SearchBoxProps = {
  onSearch?: (query: string) => void;
};

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = React.useState("");

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    onSearch?.(q);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-3 rounded-2xl border bg-white p-3 shadow-md">
        <Input
          className="flex-1 h-14 text-lg border-none shadow-none focus-visible:ring-0"
          placeholder="Search a dish… (ramen, tacos, boba)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <Button className="h-14 px-8 text-lg rounded-xl" onClick={submit}>
          Find Food
        </Button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground text-center">
        Press Enter to search.
      </p>
    </div>
  );
}
