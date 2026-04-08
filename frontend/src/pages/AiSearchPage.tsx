import * as React from "react";
import { filterStore } from "@/store/store";

interface FoodResult {
  name: string;
  location: string;
  address: string;
  description?: string;
  date?: string;
  score: number;
}

const SUGGESTIONS = [
  "Asian food",
  "something spicy",
  "healthy lunch",
  "comfort food",
  "vegetarian",
  "breakfast",
  "Italian",
  "grilled meat",
];

export default function AiSearchPage() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<FoodResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);

  const selectedDate = filterStore((state) => state.selectedDate);
  const selectedLocations = filterStore((state) => state.selectedLocations);

  const search = async (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setResults([]);

    try {
      const body: Record<string, unknown> = { query: q.trim() };
      if (selectedDate) body.date = selectedDate;
      if (selectedLocations.length > 0) body.location = selectedLocations;

      const res = await fetch("http://localhost:8000/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      setResults(await res.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Food Search
          </h1>
          <p className="text-muted-foreground text-sm">
            Describe what you're craving. Find the closest match.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-xl border bg-muted/40 px-4 py-3 text-sm outline-none
                         focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              placeholder='e.g. "Asian food", "something warm and filling"…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              disabled={loading}
            />
            <button
              onClick={() => search()}
              disabled={loading || !query.trim()}
              className="rounded-xl bg-foreground text-background px-5 py-3 text-sm font-medium
                         hover:opacity-80 disabled:opacity-40 transition-opacity whitespace-nowrap"
            >
              {loading ? "Searching…" : "Search"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  search(s);
                }}
                disabled={loading}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground
                           hover:text-foreground hover:border-foreground transition-colors disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div
            className="rounded-xl border border-destructive/40 bg-destructive/10
                          px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-muted animate-pulse"
                style={{ opacity: 1 - i * 0.15 }}
              />
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-xs text-muted-foreground">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </span>
            {results.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card px-4 py-3 flex flex-col gap-1
                              hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-sm">{item.name}</span>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.location?.replace(/-/g, " ")}
                    </span>
                    {item.date && (
                      <span className="text-xs text-muted-foreground/60 whitespace-nowrap">
                        {new Date(item.date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    )}
                  </div>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.address && (
                  <span className="text-xs text-muted-foreground/60">
                    {item.address}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="text-center text-sm text-muted-foreground py-12">
            No matching food found. Try describing it differently.
          </div>
        )}
      </div>
    </div>
  );
}
