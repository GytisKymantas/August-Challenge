"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { contactsApi } from "@/lib/api";
import type { ContactFilters } from "@/hooks/use-contact-filters";

export function useContacts(filters: ContactFilters) {
  const query = useInfiniteQuery({
    queryKey: ["contacts", filters],

    queryFn: ({ pageParam }) =>
      contactsApi.getContacts({
        page: pageParam,
        limit: 20,

        ...(filters.search && {
          fullName: filters.search,
        }),

        ...(filters.country &&
          filters.country !== "all" && {
            country: filters.country,
          }),

        ...(filters.city && {
          city: filters.city,
        }),
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
  });

  const contacts =
    query.data?.pages.flatMap((page) => page.data) ?? [];

  const availableCountries = useMemo(
    () =>
      [
        ...new Set(
          contacts
            .map((contact) => contact.country)
            .filter(Boolean),
        ),
      ].sort(),
    [contacts],
  );

  return {
    ...query,
    contacts,
    availableCountries,
  };
}