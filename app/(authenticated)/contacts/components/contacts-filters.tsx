"use client";

import { Controller } from "react-hook-form";
import type { Control, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { X } from "lucide-react";

import type { ContactFilters } from "@/hooks/use-contact-filters";

type ContactsFiltersProps = {
  control: Control<ContactFilters>;
  register: UseFormRegister<ContactFilters>;
  availableCountries: string[];
  hasActiveFilters: boolean;
  onClear: () => void;
};

export function ContactsFilters({
  control,
  register,
  availableCountries,
  hasActiveFilters,
  onClear,
}: ContactsFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Filters</h3>

        {hasActiveFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            <X size={16} className="mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>

          <Input
            {...register("city")}
            type="text"
            placeholder="Filter by city..."
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
}
