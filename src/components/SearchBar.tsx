type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="block w-full max-w-md">
      <span className="sr-only">Search for a country</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a country..."
        className="w-full rounded-md bg-app-element px-8 py-4 shadow-md outline-none dark:bg-app-dark-element"
      />
    </label>
  );
}
