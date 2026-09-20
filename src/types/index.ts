export interface RestCountry {
  names: {
    common: string;
    official: string;
    native?: Record<string, { common: string; official: string }>;
  };
  codes: {
    alpha_2: string;
    alpha_3: string;
  };
  region: string;
  subregion?: string;
  population: number;
  capitals?: { name: string }[];
  flag?: {
    url_png?: string;
    url_svg?: string;
  };
  tlds?: string[];
  currencies?: { code: string; name: string; symbol?: string }[];
  languages?: { name: string }[];
  borders?: string[];
}

export interface CountriesResponse {
  data: {
    objects: RestCountry[];
  };
}

export interface Country {
  name: string;
  nativeName?: string;
  population: number;
  region: string;
  subregion?: string;
  capital?: string;
  topLevelDomain?: string[];
  alpha3Code: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages?: {
    name: string;
    nativeName?: string;
  }[];
  borders?: string[];
}
