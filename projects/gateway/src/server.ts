import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import supergraphSdl from "inline:./supergraph.graphql";

const gateway = new ApolloGateway({
  supergraphSdl,
});

export const server = new ApolloServer({
  gateway,
});
