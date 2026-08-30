"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

import Image from "next/image";
import { useContact } from "@/hooks/use-contact";

export default function ContactDetailPage() {
  const router = useRouter();
  const params = useParams();

  const contactId = params.id as string;

  const { data: contact, isLoading, isError } = useContact(contactId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Contact not found</p>

        <Button variant="outline" onClick={() => router.push("/contacts")}>
          Back to contacts
        </Button>
      </div>
    );
  }

  const fullName = `${contact.name} ${contact.surname}`;

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-0 shadow-none bg-none">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 mx-auto lg:mx-0">
                <Image
                  src={
                    contact.imageSrc || "/placeholder.svg?height=192&width=192"
                  }
                  alt={fullName}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {fullName}
                </h1>

                <p className="text-[16px] text-gray-600 mb-1">
                  Gender:{" "}
                  <span className="capitalize"> {contact.gender} </span>{" "}
                </p>

                <p className="text-[16px] text-gray-600 mb-1">
                  Address: {contact.address}
                </p>
                <p className="text-[16px] text-gray-600 mb-1">
                  City: {contact.city}
                </p>
                <p className="text-[16px] text-gray-600 mb-1">
                  Country: {contact.country}
                </p>

                <div className="flex items-center gap-2">
                  <p className="text-[16px] text-gray-600 mb-1">
                    Phone:{" "}
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[16px] text-gray-600">Email:</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <p className="text-[20px] font-semibold mt-2">Bio</p>
        <div className="bg-[#FAFAFA] pb-6">
          <p className="text-sm p-4 text-[#666666] ">{contact.bio}</p>
        </div>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </main>
    </div>
  );
}
