import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

export class BattutaApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://battuta.medunes.net/";
  }

  willSendRequest(request: RequestOptions) {
    request.params.append("key", process.env["BATTUTA_API_KEY"]!);
  }

  async getCountrySummaries() {
    const response = await this.get<CountrySummary[]>("/api/country/all");
    return response.map((x) => ({
      countryCode: x.code.toUpperCase(),
      name: x.name,
    }));
  }

  async getCountrySummary(countryCode: string) {
    const countries = await this.getCountrySummaries();

    return countries.filter((x) => x.countryCode === countryCode)[0];
  }
}

export interface CountrySummary {
  name: string;
  code: string;
}
