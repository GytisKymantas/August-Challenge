"use client";

import { useEffect } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";
import {
  CONTACT_COUNTRY_FILTERS,
  ContactFilterField,
} from "@/constants/general";

export type ContactFilters = {
  search: string;
  country: string;
  city: string;
};

export function useContactFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    reset,
    control,
    register,
    setValue,
    formState: { isDirty },
  } = useForm<ContactFilters>({
    defaultValues: {
      search: searchParams.get(ContactFilterField.SEARCH) ?? "",
      country: searchParams.get(ContactFilterField.COUNTRY) ?? "",
      city: searchParams.get(ContactFilterField.CITY) ?? "",
    },
  });

  const search = useWatch({
    control,
    name: ContactFilterField.SEARCH,
  });

  const country = useWatch({
    control,
    name: ContactFilterField.COUNTRY,
  });

  const city = useWatch({
    control,
    name: ContactFilterField.CITY,
  });

  const debouncedSearch = useDebounce(search, 300);
  const debouncedCity = useDebounce(city, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Search
    if (debouncedSearch) {
      params.set(
        ContactFilterField.SEARCH,
        debouncedSearch,
      );
    } else {
      params.delete(ContactFilterField.SEARCH);
    }

    // Country
    if (
      country &&
      country !== CONTACT_COUNTRY_FILTERS.ALL
    ) {
      params.set(
        ContactFilterField.COUNTRY,
        country,
      );
    } else {
      params.delete(ContactFilterField.COUNTRY);
    }

    // City
    if (debouncedCity) {
      params.set(
        ContactFilterField.CITY,
        debouncedCity,
      );
    } else {
      params.delete(ContactFilterField.CITY);
    }

    const queryString = params.toString();

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
    );
  }, [
    debouncedSearch,
    country,
    debouncedCity,
    pathname,
    router,
    searchParams,
  ]);

  const clearFilters = () => {
    reset({
      search: "",
      country: "",
      city: "",
    });
  };
  const clearFilter = (field: keyof ContactFilters) => {
  setValue(field, "");
};

const activeFilterCount = [
  debouncedSearch,
  debouncedCity,
  country !== CONTACT_COUNTRY_FILTERS.ALL ? country : "",
].filter(Boolean).length;

  return {
    isDirty,
    control,
    register,
    filters: {
      search: debouncedSearch,
      country,
      city: debouncedCity,
    },
    clearFilters,
    activeFilterCount,
    clearFilter,
  };
}