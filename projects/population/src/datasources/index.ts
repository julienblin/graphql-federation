import { DataSources as ApolloDataSources } from "apollo-server-core/dist/requestPipeline";
import { CountriesNow } from "./countriesnow";

export interface DataSources {
  countriesnow: CountriesNow;
}

export const buildDataSources = (): ApolloDataSources<DataSources> => ({
  countriesNow: new CountriesNow(),
});
