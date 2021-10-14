import { DataSources as ApolloDataSources } from "apollo-server-core/dist/requestPipeline";
import { CountriesNow } from "./countriesnow";

export type DataSources = ApolloDataSources<{
  countriesnow: CountriesNow;
}>;

export const buildDataSources = (): DataSources => ({
  countriesnow: new CountriesNow(),
});
