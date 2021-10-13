import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { Covid19Api } from "./datasource";
import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";

interface DataSources {
  covid19api: Covid19Api;
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
    covid19CountrySummaries: [Covid19CountrySummary]
  }

  type Covid19CountrySummary @key(fields: "countryCode") {
    countryCode: String!
    totalConfirmed: Int!
    totalDeath: Int!
  }
`;

const resolvers: Resolvers = {
  Query: {
    covid19CountrySummaries(root, args, { dataSources }) {
      return dataSources.covid19api.getSummaries();
    },
  },
  Covid19CountrySummary: {
    __resolveReference(root, args, { dataSources }) {
      return dataSources.covid19api.getASummary(args.countryCode);
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
    covid19api: new Covid19Api(),
  }),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Covid19 service ready at ${url}`);
});
