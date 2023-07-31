import { Redis } from "@upstash/redis";
import type { Visit } from "./types";
import { CITY_HEADER, COUNTRY_HEADER } from "./constants";
import redis from "./redis";

const set_name = "visitors";

export function get_city(request: Request) {
  const city = request.headers.get(CITY_HEADER) ?? "unknown city";
  const country = get_country_name(request.headers.get(COUNTRY_HEADER));
  return `${city}, ${country}`;
}

const display_names = new Intl.DisplayNames(["en"], { type: "region" });
export function get_country_name(countryCode: string | null) {
  if (countryCode) {
    return display_names.of(countryCode);
  }
  return "unknown country";
}

export async function get_visitors(): Promise<Visit[]> {
  const visitors = await redis.zrange<string[]>(set_name, 0, -1, { withScores: true });
  return adapt_visitors(visitors);
}

export async function add_visitor(city: string) {
  await redis.zincrby(set_name, 1, city);
}

// takes the result from ZRANGE and adapt it into a list of visits
// e.g. ['Seattle', '2', 'Los Angeles', '1'] becomes
// [ { city: 'Seattle', count: '2'}, { city: 'Los Angeles', count: '1' } ]
function adapt_visitors(visitors: string[]): Visit[] {
  const adapted: Visit[] = [];
  for (let i = 0; i < visitors.length; i += 2) {
    const member = visitors[i];
    const score = visitors[i + 1];
    adapted.push({ city: decodeURIComponent(member), count: score });
  }
  return adapted;
}
