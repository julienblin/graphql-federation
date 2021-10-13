import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";
import { CountriesNowApi } from "./countriesnow-api";

const typeDefs = gql`
  extend type Country @key(fields: "countryCode") {
    countryCode: String! @external
    population: Int
  }
`;

const resolvers = {
  Country: {
    async __resolveReference(country, { dataSources }) {
      return dataSources.countriesNowApi.populationLoader.load(
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
  dataSources: () => ({
    countriesNowApi: new CountriesNowApi(),
  }),
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Population service ready at ${url}`);
});
