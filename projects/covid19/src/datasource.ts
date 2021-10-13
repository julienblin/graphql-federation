import { RESTDataSource } from "apollo-datasource-rest";

export class Covid19Api extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.covid19api.com/";
  }

  async getSummaries() {
    const response = await this.get<Covid19SummaryResponse>("summary");
    return response.Countries.map((x) => ({
      countryCode: x.CountryCode,
      totalConfirmed: x.TotalConfirmed,
      totalDeath: x.TotalDeaths,
    }));
  }

  async getASummary(countryCode: string) {
    const summaries = await this.getSummaries();
    return summaries.filter((x) => x.countryCode === countryCode);
  }
}

export interface Covid19SummaryResponse {
  ID: string;
  Message: string;
  Global: Global;
  Countries: Country[];
  Date: Date;
}

export interface Country {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}
