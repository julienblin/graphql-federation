import { DataSources } from "./datasources";
import { Resolvers } from "./schema.types";

export const resolvers: Resolvers<{ dataSources: DataSources }> = {
  Country: {
    async __resolveReference(country, { dataSources }) {
      return {
        countryCode: country.countryCode,
        covid19: await dataSources.covid19.summaryLoader.load(
          country.countryCode
        ),
      };
    },
  },
};
