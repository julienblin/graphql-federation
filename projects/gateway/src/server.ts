import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supergraphSdl from "inline:./supergraph.graphql";

const gateway = new ApolloGateway({
  supergraphSdl,
});

export const server = new ApolloServer({
  gateway,
});
