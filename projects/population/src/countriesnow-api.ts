import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";

export class CountriesNowApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://countriesnow.space/api/v0.1/";
  }

  populationLoader = new DataLoader(
    async (countryCodes: ReadonlyArray<string>) => {
      const [population, iso] = await Promise.all([
        this.get<ApiResponse<Population>>("countries/population"),
        this.get<ApiResponse<ISOCode>>("countries/iso"),
      ]);

      const iso2ByIso3 = iso.data.reduce(
        (acc, cur) => ({ ...acc, [cur.Iso3]: cur.Iso2 }),
        {} as Record<string, string>
      );

      const populationByIso2Codes = (
        await this.get<ApiResponse<Population>>("countries/population")
      ).data.reduce(
        (acc, cur) => ({ ...acc, [iso2ByIso3[cur.code]]: cur }),
        {} as Record<string, Population>
      );

      return countryCodes.map((x) =>
        populationByIso2Codes[x]
          ? {
              countryCode: x,
              population:
                populationByIso2Codes[x].populationCounts[
                  populationByIso2Codes[x].populationCounts.length - 1
                ].value,
            }
          : {}
      );
    }
  );
}

export interface ApiResponse<T> {
  error: boolean;
  msg: string;
  data: T[];
}

export interface Population {
  country: string;
  code: string;
  populationCounts: PopulationCount[];
}

export interface PopulationCount {
  year: number;
  value: number;
}

export interface ISOCode {
  name: string;
  Iso2: string;
  Iso3: string;
}
