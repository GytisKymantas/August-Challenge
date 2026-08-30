"use client";

import { useContactFilters } from "@/hooks/use-contact-filters";
import { useContacts } from "@/hooks/use-contacts";
import { ContactsToolbar } from "./components/contacts-toolbar";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { ContactsContent } from "./components/contacts-content";

export default function ContactsPage() {
  const {
    register,
    control,
    clearFilters,
    clearFilter,
    filters,
    isDirty: hasActiveFilters,
    activeFilterCount,
  } = useContactFilters();

  const {
    isLoading: isContactsLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    contacts,
    availableCountries,
  } = useContacts(filters);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <ContactsToolbar
            register={register}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            control={control}
            availableCountries={availableCountries}
            onClear={clearFilters}
            clearFilter={clearFilter}
          />
        </div>
        <div className="py-6">
          <ContactsContent
            contacts={contacts}
            isLoading={isContactsLoading}
            isError={isError}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center h-20 mt-8"
          >
            {isFetchingNextPage && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
