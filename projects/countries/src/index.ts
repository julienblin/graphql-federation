import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { BattutaApi } from "./battuta-api";
import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";

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
  type Query {
    countries: [CountrySummary]
  }

  type CountrySummary @key(fields: "countryCode") {
    countryCode: String!
    name: String!
  }
`;

const resolvers: Resolvers = {
  Query: {
    countries(root, args, { dataSources }) {
      return dataSources.battutaApi.getCountrySummaries();
    },
  },
  CountrySummary: {
    __resolveReference(root, args, { dataSources }) {
      return dataSources.battutaApi.getCountrySummary(args.countryCode);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
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
