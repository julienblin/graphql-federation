import { DataSources } from "./datasources";
import { Resolvers } from "./schema.types";

export const resolvers: Resolvers<{ dataSources: DataSources }> = {
  Country: {
    async __resolveReference(country, { dataSources }) {
      return dataSources.countriesnow.populationLoader.load(
        country.countryCode
      );
    },
  },
};
