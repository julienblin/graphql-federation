import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { GraphQLResolveInfo } from "graphql";
import { BattutaApi } from "./battuta-api";

interface DataSources {
  battutaApi: BattutaApi;
}

interface Context {
  dataSources: DataSources;
}

type Resolver = (
  parent: unknown,
  args: any,
  context: Context,
  info?: GraphQLResolveInfo
) => unknown;

type Resolvers = Record<string, Record<string, Resolver>>;

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

const resolvers: Resolvers = {
  Query: {
    countries(root, args, { dataSources }) {
      return dataSources.battutaApi.getCountries(args.countryCodes);
    },
    async country(root, args, { dataSources }) {
      return (await dataSources.battutaApi.getCountries([args.countryCode]))[0];
    },
  },
  Country: {
    async __resolveReference(root, args, { dataSources }) {
      return dataSources.battutaApi.countryLoader.load(args.countryCode);
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
