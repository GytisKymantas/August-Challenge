"use client";

import { CircleX } from "lucide-react";
import {
  Controller,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { ContactFilters } from "@/hooks/use-contact-filters";

type ContactsToolbarProps = {
  register: UseFormRegister<ContactFilters>;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  control: Control<ContactFilters>;
  availableCountries: string[];
  onClear: () => void;
  clearFilter: (field: keyof ContactFilters) => void;
};

export function ContactsToolbar({
  register,
  control,
  availableCountries,
  clearFilter,
}: ContactsToolbarProps) {
  const search = useWatch({
    control,
    name: "search",
  });

  const city = useWatch({
    control,
    name: "city",
  });

  const country = useWatch({
    control,
    name: "country",
  });

  return (
    <div className="space-y-4 bg-[#F7F7F7]">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Country */}

        <div className="flex min-w-[276px]">
          <p className="bg-[#E6E6E6] min-w-[60px] px-2 flex items-center text-sm ">
            Country
          </p>

          <div className="relative flex-1">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-8 w-full min-w-0 bg-white rounded-none justify-between">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All countries</SelectItem>

                    {availableCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="flex min-w-[276px]">
          <p className="bg-[#E6E6E6] min-w-[68px] items-center px-2 flex justify-center text-sm">
            City
          </p>

          <div className="relative flex-1">
            <Input
              {...register("city")}
              type="text"
              placeholder="Filter by city..."
              className="h-8 w-full border-l border-t border-b rounded-none bg-white pr-10"
            />

            {city && (
              <button
                type="button"
                onClick={() => clearFilter("city")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear city filter"
              >
                <CircleX size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex min-w-[276px]">
          <p className="bg-[#E6E6E6] px-2 flex min-w-[68px] justify-center items-center text-sm">
            Name
          </p>

          <div className="relative flex-1">
            <Input
              {...register("search")}
              type="text"
              placeholder="Enter name here..."
              className="h-8 w-full border-l border-t border-b rounded-none bg-white pr-10"
            />

            {search && (
              <button
                type="button"
                onClick={() => clearFilter("search")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear name filter"
              >
                <CircleX size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
