"use client";

import { Button } from "@/components/ui/button";
import { ContactCard } from "@/components/contact-card";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contact";
import { ContactCardSkeleton } from "@/components/contact-card-skeleton";

type ContactsContentProps = {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

export function ContactsContent({
  contacts,
  isLoading,
  isError,
  hasActiveFilters,
  onClearFilters,
}: ContactsContentProps) {
  const router = useRouter();

  const onContactClick = (contactId: string) => {
    router.push(`/contacts/${contactId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <ContactCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load contacts.</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {hasActiveFilters
            ? "No contacts found matching your filters"
            : "No contacts found"}
        </p>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
            className="mt-4"
          >
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onClick={() => onContactClick(contact.id)}
        />
      ))}
    </div>
  );
}
