import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer } from "apollo-server";
import { buildDataSources } from "./datasources";
import typeDefs from "./schema.graphql";

const resolvers = {
  Country: {
    async __resolveReference(country, { dataSources }) {
      return dataSources.countriesNow.populationLoader.load(
        country.countryCode
      );
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
  dataSources: buildDataSources,
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Population service ready at ${url}`);
});
