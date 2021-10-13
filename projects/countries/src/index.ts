import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { BattutaApi } from "./battuta-api";

const typeDefs = gql`
  extend type Query {
    countries(countryCodes: [String!]): [Country]
    country(countryCode: String!): Country
  }

  type Country @key(fields: "countryCode") {
    countryCode: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    countries(root, args, { dataSources }) {
      return dataSources.battutaApi.getCountries(args.countryCodes);
    },
    async country(root, args, { dataSources }) {
      return { countryCode: args.countryCode };
    },
  },
  Country: {
    async __resolveReference(root, args, { dataSources }) {
      return dataSources.battutaApi.countryLoader.load(args.countryCode);
    },
    async name(root, args, { dataSources }) {
      return (await dataSources.battutaApi.countryLoader.load(root.countryCode))
        .name;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  dataSources: () => ({
    battutaApi: new BattutaApi(),
  }),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Country service ready at ${url}`);
});
