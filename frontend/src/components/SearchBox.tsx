import * as React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SearchBoxProps = {
  onSearch?: (query: string) => void;
};

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = React.useState("");

  const submit = async () => {
    const q = query.trim();
    if (!q) return;
    onSearch?.(q);
  };

  return (
    <div className="absolute top-5 left-20 z-[1000] p-1 rounded-xl">
      <div className="flex w-full items-center gap-3 rounded-2x1">
        <Input
          className="bg-white dark:bg-slate-950"
          placeholder="Search a dish… (ramen, tacos, boba)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <Button className="h-8 px-8 text-sm rounded-xl" onClick={submit}>
          Find Food
        </Button>
      </div>

      {/* <p className="mt-3 text-sm text-muted-foreground text-center">
        Press Enter to search.
      </p> */}
    </div >
  );
}
