import type { Country } from "../types";
import { CountryCard } from "./CountryCard";

type CountryListProps = {
  countries: Country[];
  onSelect: (code: string) => void;
};

export function CountryList({ countries, onSelect }: CountryListProps) {
  if (countries.length === 0) {
    return <p>No countries found.</p>;
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {countries.map((country) => (
        <CountryCard
          key={country.alpha3Code}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
