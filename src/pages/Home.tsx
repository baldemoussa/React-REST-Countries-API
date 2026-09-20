import { useState } from "react";
import { CountryDetail } from "../components/CountryDetail";
import { CountryList } from "../components/CountryList";
import { RegionFilter } from "../components/RegionFilter";
import { SearchBar } from "../components/SearchBar";
import { useFetch } from "../hooks/useFetch";
import type { CountriesResponse, Country, RestCountry } from "../types";

const API_URL =
  "/api/countries?limit=100&response_fields=names,codes,region,subregion,population,capitals,flag,tlds,currencies,languages,borders";

const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY;
const apiHeaders = apiKey
  ? { Authorization: `Bearer ${apiKey}` }
  : undefined;

function toCountry(apiCountry: RestCountry): Country {
  const flagCode = apiCountry.codes.alpha_2.toLowerCase();
  const nativeNames = apiCountry.names.native
    ? Object.values(apiCountry.names.native)
    : [];

  return {
    name: apiCountry.names.common,
    nativeName: nativeNames[0]?.common,
    population: apiCountry.population,
    region: apiCountry.region,
    subregion: apiCountry.subregion,
    capital: apiCountry.capitals?.[0]?.name,
    topLevelDomain: apiCountry.tlds,
    alpha3Code: apiCountry.codes.alpha_3,
    flags: {
      png: apiCountry.flag?.url_png || `https://flagcdn.com/w320/${flagCode}.png`,
      svg: apiCountry.flag?.url_svg || `https://flagcdn.com/${flagCode}.svg`,
    },
    currencies: apiCountry.currencies?.map((currency) => ({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol ?? "",
    })),
    languages: apiCountry.languages,
    borders: apiCountry.borders,
  };
}

export function Home() {
  const { data, loading, error } = useFetch<CountriesResponse>(
    apiKey ? API_URL : null,
    apiHeaders
  );
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const countries = data?.data.objects.map(toCountry) ?? [];

  const selectedCountry = countries.find(
    (country) => country.alpha3Code === selectedCode
  );

  const visibleCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region === "" || country.region === region;
    return matchesSearch && matchesRegion;
  });

  if (selectedCountry) {
    return (
      <CountryDetail
        country={selectedCountry}
        countries={countries}
        onBack={() => setSelectedCode(null)}
        onSelect={setSelectedCode}
      />
    );
  }

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>Could not load the API.</p>;
  }

  return (
    <div>
      <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
      </div>
      <CountryList countries={visibleCountries} onSelect={setSelectedCode} />
    </div>
  );
}
