import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";
import config from "../config";
import version from "../version";

export class Battuta extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://battuta.medunes.net/";
  }

  willSendRequest(request: RequestOptions) {
    request.params.append("key", config.battutaApiKey);
    request.headers.append(
      "User-Agent",
      `countries/${version} (${config.environment})`
    );
  }

  countryLoader = new DataLoader(
    async (countryCodes: ReadonlyArray<string>) => {
      const countrySummaryByCountryCodes = (
        await this.get<CountrySummary[]>("/api/country/all")
      ).reduce(
        (acc, cur) => ({ ...acc, [cur.code.toUpperCase()]: cur }),
        {} as Record<string, CountrySummary>
      );

      return countryCodes.map((x) => ({
        countryCode: countrySummaryByCountryCodes[x]?.code?.toUpperCase() || x,
        name: countrySummaryByCountryCodes[x]?.name || "",
      }));
    }
  );

  async getCountries(countryCodes?: string[] | null) {
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
