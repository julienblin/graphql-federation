import { GraphQLResolverMap } from "apollo-graphql";
import { DataSources } from "./datasources";

export const resolvers: GraphQLResolverMap<{ dataSources: DataSources }> = {
  Country: {
    async __resolveReference(country, { dataSources }) {
      return {
        ...country,
        covid19: dataSources.covid19.summaryLoader.load(country.countryCode),
      };
    },
  },
};
