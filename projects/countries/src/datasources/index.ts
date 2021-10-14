import { DataSources as ApolloDataSources } from "apollo-server-core/dist/requestPipeline";
import { Battuta } from "./battuta";

export interface DataSources {
  battuta: Battuta;
}

export const buildDataSources = (): ApolloDataSources<DataSources> => ({
  battuta: new Battuta(),
});
