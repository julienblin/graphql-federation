import { GraphQLResolverMap } from "apollo-graphql";
import { DataSources } from "./datasources";

export const resolvers: GraphQLResolverMap<{ dataSources: DataSources }> = {
  Query: {
    countries(root, args, { dataSources }) {
      return dataSources.battuta.getCountries(args.countryCodes);
    },
    async country(root, args) {
      return { countryCode: args.countryCode };
    },
  },
  Country: {
    async __resolveReference(root, args, { dataSources }) {
      return dataSources.battuta.countryLoader.load(args.countryCode);
    },
    async name(root, args, { dataSources }) {
      return (await dataSources.battuta.countryLoader.load(root.countryCode))
        .name;
    },
  },
};
