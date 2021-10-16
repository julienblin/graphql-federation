import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server";
import { buildDataSources } from "./datasources";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";

export const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers: resolvers as any,
    },
  ]),
  dataSources: buildDataSources,
});
