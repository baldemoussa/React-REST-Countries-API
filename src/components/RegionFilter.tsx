const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

type RegionFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <label>
      <span className="sr-only">Filter by region</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md bg-app-element px-6 py-4 shadow-md dark:bg-app-dark-element"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </label>
  );
}
