// lib/api/contacts.ts

import { apiFetch } from "./api/fetch-client";

interface GetContactsParams {
  page?: number;
  limit?: number;
  country?: string;
  city?: string;
  fullName?: string;
}

class ContactsAPI {
  async getContacts(params: GetContactsParams = {}) {
    const { page = 1, limit = 20, country, city, fullName } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (country) {
      searchParams.append("country", country);
    }

    if (city) {
      searchParams.append("city", city);
    }

    if (fullName) {
      searchParams.append("fullName", fullName);
    }
    const response = await apiFetch(`/api/contacts?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }

    return response.json();
  }

  async getContact(id: string) {
    const response = await apiFetch(`/api/contacts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch contact");
    }

    return response.json();
  }
}

export const contactsApi = new ContactsAPI();
