export const CONTACT_COUNTRY_FILTERS = {
  ALL: "all",
} as const;

export enum ContactFilterField {
  SEARCH = "search",
  COUNTRY = "country",
  CITY = "city",
}

export const BASE_URL =
  "https://metasite-fe-task-api.azurewebsites.net/api/v1";
