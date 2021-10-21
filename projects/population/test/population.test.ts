import { gql } from "apollo-server";
import { Country } from "../src/schema.types";
import { server } from "../src/server";
import { captureHttp } from "./nock-support";

describe("population", () => {
  it("should return the population of a country", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query ($representations: [_Any!]!) {
            _entities(representations: $representations) {
              ... on Country {
                countryCode
                population
              }
            }
          }
        `,
        variables: {
          representations: {
            __typename: "Country",
            countryCode: "CA",
          },
        },
      });
    });

    expect(result.errors).toBeFalsy();
    expect(result.data._entities[0]).toMatchObject(<Country>{
      countryCode: "CA",
      population: expect.any(Number),
    });
  });

  it("should return nothing when country is not found.", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query ($representations: [_Any!]!) {
            _entities(representations: $representations) {
              ... on Country {
                countryCode
                population
              }
            }
          }
        `,
        variables: {
          representations: {
            __typename: "Country",
            countryCode: "XX",
          },
        },
      });
    });

    expect(result.errors).toBeFalsy();
    expect(result.data._entities[0]).toMatchObject(<Country>{
      countryCode: "XX",
      population: null,
    });
  });
});
