import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

// Elasticsearch response structure
interface ElasticsearchHit {
  _index: string;
  _id: string;
  _score: number;
  _source: {
    name: string;
    date: string;
    description: string;
    location: string;
  };
}

interface FoodResultCardProps {
  results: ElasticsearchHit[] | null;
}

export const FoodResultCard: React.FC<FoodResultCardProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No results found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{results.length}</span> result{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {results.map((hit) => {
          const item = hit._source;
          const date = new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          
          return (
            <Card 
              key={hit._id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight leading-tight">
                    {item.name}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="shrink-0 flex items-center gap-1 text-xs"
                  >
                    <TrendingUp className="h-3 w-3" />
                    {hit._score.toFixed(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Location and Date */}
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{item.location}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">{date}</span>
                  </Badge>
                </div>

                {/* Description (if present) */}
                {item.description && item.description.trim() && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};