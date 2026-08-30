import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const countryFlags: Record<string, string> = {
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Belgium: "BE",
  Brazil: "BR",
  Canada: "CA",
  China: "CN",
  Denmark: "DK",
  Estonia: "EE",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  Greece: "GR",
  India: "IN",
  Ireland: "IE",
  Italy: "IT",
  Japan: "JP",
  Latvia: "LV",
  Lithuania: "LT",
  Luxembourg: "LU",
  Mauritius: "MU",
  Mexico: "MX",
  Netherlands: "NL",
  NewZealand: "NZ",
  Norway: "NO",
  Poland: "PL",
  Portugal: "PT",
  Romania: "RO",
  Russia: "RU",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  SouthAfrica: "ZA",
  SouthKorea: "KR",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Thailand: "TH",
  Turkey: "TR",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Vietnam: "VN",
};

export function getCountryFlag(country: string): string {
  return countryFlags[country] ?? "🌍";
}