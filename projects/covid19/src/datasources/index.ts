import { DataSources as ApolloDataSources } from "apollo-server-core/dist/requestPipeline";
import { Covid19 } from "./covid19";

export interface DataSources {
  covid19: Covid19;
}

export const buildDataSources = (): ApolloDataSources<DataSources> => ({
  covid19: new Covid19(),
});
