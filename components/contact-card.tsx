"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getCountryFlag } from "@/lib/utils";
import type { Contact } from "@/types/contact";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

export function ContactCard({ contact, onClick }: ContactCardProps) {
  const fullName = `${contact.name} ${contact.surname}`;

  return (
    <Card
      tabIndex={0}
      role="button"
      aria-label={`View contact ${fullName}`}
      className="cursor-pointer border-0 shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={contact.imageSrc || "/placeholder.svg?height=240&width=320"}
              alt={fullName}
              fill
              loading="lazy"
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center">
                <ReactCountryFlag
                  countryCode={getCountryFlag(contact.country)}
                  svg
                />

                <span className="ml-2 text-xs text-white">
                  {contact.country}
                </span>
              </div>

              <h3 className="mb-1 text-lg font-semibold text-white">
                {fullName}
              </h3>

              <span className="line-clamp-2 text-sm text-white">
                {contact.bio}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
