import { gql } from "apollo-server";
import { Country } from "../src/schema.types";
import { server } from "../src/server";
import { captureHttp } from "./nock-support";

describe("covid19", () => {
  it("should return covid19 stats", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query ($representations: [_Any!]!) {
            _entities(representations: $representations) {
              ... on Country {
                countryCode
                covid19 {
                  totalConfirmed
                  totalDeath
                }
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
      covid19: {
        totalConfirmed: expect.any(Number),
        totalDeath: expect.any(Number),
      },
    });
  });
});
