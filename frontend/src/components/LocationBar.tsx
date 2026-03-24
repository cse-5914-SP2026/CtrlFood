import * as React from "react";
import { Input } from "./ui/input";
import { MapPin } from "lucide-react";

type LocationBarProps = {
  street: string;
  city: string;
  state: string;
  onChange: (location: {
    street: string;
    city: string;
    state: string;
  }) => void;
};

export function LocationBar({
  street,
  city,
  state,
  onChange,
}: LocationBarProps) {
  return (
    <div className="flex items-center gap-2">

      <MapPin className="h-5 w-5 text-slate-500" />

      <Input
        className="h-11 w-[180px] rounded-full border-none bg-white text-slate-900 shadow-md px-4"
        placeholder="Street"
        value={street}
        onChange={(e) =>
          onChange({ street: e.target.value, city, state })
        }
      />

      <Input
        className="h-11 w-[140px] rounded-full border-none bg-white text-slate-900 shadow-md px-4"
        placeholder="City"
        value={city}
        onChange={(e) =>
          onChange({ street, city: e.target.value, state })
        }
      />

      <Input
        className="h-11 w-[80px] rounded-full border-none bg-white text-slate-900 shadow-md px-4"
        placeholder="State"
        value={state}
        onChange={(e) =>
          onChange({ street, city, state: e.target.value })
        }
      />
    </div>
  );
}