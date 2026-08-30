"use client"

import { useQuery } from "@tanstack/react-query"

import { contactsApi } from "@/lib/api"

export function useContact(id: string) {
  return useQuery({
    queryKey: ["contact", id],

    queryFn: () => contactsApi.getContact(id),

    enabled: Boolean(id),
  })
}