import { DataSources } from "./datasources";
import { Resolvers } from "./schema.types";

export const resolvers: Resolvers<{ dataSources: DataSources }> = {
  Query: {
    countries(root, args, { dataSources }) {
      return dataSources.battuta.getCountries(args.countryCodes);
    },
    country(root, args, { dataSources }) {
      return dataSources.battuta.countryLoader.load(args.countryCode);
    },
  },
  Country: {
    __resolveReference(country, { dataSources }) {
      return dataSources.battuta.countryLoader.load(country.countryCode);
    },
  },
};
