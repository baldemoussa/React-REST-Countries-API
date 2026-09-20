import type { Country } from "../types";

type CountryCardProps = {
  country: Country;
  onSelect: (code: string) => void;
};

export function CountryCard({ country, onSelect }: CountryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(country.alpha3Code)}
      className="overflow-hidden rounded-md bg-app-element text-left shadow-md dark:bg-app-dark-element"
    >
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name}`}
        className="h-40 w-full object-cover"
      />
      <div className="px-6 pb-10 pt-6">
        <h2 className="mb-4 text-lg font-extrabold">{country.name}</h2>
        <p className="text-sm">
          <span className="font-semibold">Population: </span>
          {country.population.toLocaleString()}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Region: </span>
          {country.region}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Capital: </span>
          {country.capital ?? "N/A"}
        </p>
      </div>
    </button>
  );
}
