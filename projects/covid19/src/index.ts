import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { Covid19Api } from "./covid19-api";

const typeDefs = gql`
  extend type Country @key(fields: "countryCode") {
    countryCode: String! @external
    totalConfirmed: Int
    totalDeath: Int
  }
`;

const resolvers = {
  Country: {
    async __resolveReference(reference, { dataSources }) {
      return dataSources.covid19api.summaryLoader.load(reference.countryCode);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers: resolvers as any,
    },
  ]),
  dataSources: () => ({
    covid19api: new Covid19Api(),
  }),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Covid19 service ready at ${url}`);
});
