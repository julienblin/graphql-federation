import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "Countries", url: "http://localhost:4002/graphql" },
    { name: "Covid19", url: "http://localhost:4001/graphql" },
    { name: "Population", url: "http://localhost:4003/graphql" },
  ],
});

const server = new ApolloServer({
  gateway,
});

server
  .listen(3000)
  .then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => console.error(err));
