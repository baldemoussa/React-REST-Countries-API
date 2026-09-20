import type { Country } from "../types";

type CountryDetailProps = {
  country: Country;
  countries: Country[];
  onBack: () => void;
  onSelect: (code: string) => void;
};

function joinNames(items?: { name: string }[]) {
  if (!items || items.length === 0) return "N/A";
  return items.map((item) => item.name).join(", ");
}

export function CountryDetail({
  country,
  countries,
  onBack,
  onSelect,
}: CountryDetailProps) {
  const borderCountries = (country.borders ?? [])
    .map((code) => countries.find((item) => item.alpha3Code === code))
    .filter((item) => item !== undefined);

  return (
    <section>
      <button
        type="button"
        onClick={onBack}
        className="mb-16 rounded-md bg-app-element px-8 py-2 shadow-md dark:bg-app-dark-element"
      >
        Back
      </button>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name}`}
          className="w-full shadow-md"
        />

        <div>
          <h2 className="mb-6 text-3xl font-extrabold">{country.name}</h2>

          <div className="grid gap-8 text-sm md:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name: </span>
                {country.nativeName ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region: </span>
                {country.subregion ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                {country.capital ?? "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                {country.topLevelDomain?.join(", ") ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies: </span>
                {joinNames(country.currencies)}
              </p>
              <p>
                <span className="font-semibold">Languages: </span>
                {joinNames(country.languages)}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 font-semibold">Border Countries:</p>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((borderCountry) => (
                  <button
                    key={borderCountry.alpha3Code}
                    type="button"
                    onClick={() => onSelect(borderCountry.alpha3Code)}
                    className="rounded-md bg-app-element px-6 py-2 shadow-md dark:bg-app-dark-element"
                  >
                    {borderCountry.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
