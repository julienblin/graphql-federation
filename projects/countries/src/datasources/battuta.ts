import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";

export class Battuta extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://battuta.medunes.net/";
  }

  willSendRequest(request: RequestOptions) {
    request.params.append("key", process.env["BATTUTA_API_KEY"]!);
  }

  countryLoader = new DataLoader(
    async (countryCodes: ReadonlyArray<string>) => {
      const countrySummaryByCountryCodes = (
        await this.get<CountrySummary[]>("/api/country/all")
      ).reduce(
        (acc, cur) => ({ ...acc, [cur.code.toUpperCase()]: cur }),
        {} as Record<string, CountrySummary>
      );

      return countryCodes.map((x) =>
        countrySummaryByCountryCodes[x]
          ? {
              countryCode: countrySummaryByCountryCodes[x].code.toUpperCase(),
              name: countrySummaryByCountryCodes[x].name,
            }
          : {}
      );
    }
  );

  async getCountries(countryCodes?: string[]) {
    const response = await this.get<CountrySummary[]>("/api/country/all");
    return response
      .filter((x) =>
        countryCodes?.length
          ? countryCodes.includes(x.code.toUpperCase())
          : true
      )
      .map((x) => ({
        countryCode: x.code.toUpperCase(),
        name: x.name,
      }));
  }
}

export interface CountrySummary {
  name: string;
  code: string;
}
