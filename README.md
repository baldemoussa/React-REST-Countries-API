# REST Countries API

A React app that lists countries from the REST Countries v5 API, with search, region filter, a detail view, border-country links, and light/dark mode.

## Setup

1. Install packages: `npm install`
2. Add your API key in `.env.local`:

```
VITE_REST_COUNTRIES_API_KEY=your_key_here
```

3. Start the app: `npm run dev`

Restart the dev server after changing `.env.local`.

## How the app is built

The app is a React component tree. Data flows **down** as props. Events flow **up** as callback functions. Theme is shared with **context**, so it does not need to be passed through every component.

`main.tsx` renders `App`. `App` wraps the page in `ThemeProvider`, then shows `Header` and `Home`. `Home` is the hub. It shows either the country list or `CountryDetail`.

`Home` calls `useFetch` with the API URL and the key from `.env.local` (`import.meta.env.VITE_REST_COUNTRIES_API_KEY`). Vite proxies `/api/countries` to REST Countries v5 so the browser is not blocked by CORS. When data arrives, `toCountry` maps each API object into the `Country` type used by the cards and detail page.

`Home` keeps three pieces of state: `search`, `region`, and `selectedCode`. It filters countries by name and region, then passes `visibleCountries` to `CountryList`. `CountryList` maps that array to `CountryCard`. `SearchBar` and `RegionFilter` are controlled inputs: `Home` owns the values, the children call `onChange`, and `Home` updates state. React then re-renders the list.

When a user clicks a card, `onSelect` runs `setSelectedCode`. `Home` finds that country and renders `CountryDetail`. **Back** sets `selectedCode` to `null`, so the list returns. Border buttons look up a neighbor by `alpha3Code` in the same `countries` array and call `onSelect` again.

`Header` reads `darkMode` and `toggleDarkMode` from `ThemeContext`. Clicking the button updates the provider, which adds or removes the `dark` class on the page.

Child components do not fetch data. They only display what `Home` gives them or report clicks back to `Home`.
