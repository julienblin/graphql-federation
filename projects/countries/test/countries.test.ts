import { gql } from "apollo-server-core";
import { Country } from "../src/schema.types";
import { server } from "../src/server";
import { captureHttp } from "./nock-support";

describe("countries", () => {
  it("should fetch countries", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query {
            countries {
              countryCode
              name
            }
          }
        `,
      });
    });

    expect(result.errors).toBeFalsy();
    expect(result.data.countries.length).toBeTruthy();
  });

  it("should fetch individual country", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query {
            country(countryCode: "CA") {
              countryCode
              name
            }
          }
        `,
      });
    });

    expect(result.errors).toBeFalsy();
    expect(result.data.country).toMatchObject(<Country>{
      countryCode: "CA",
      name: "Canada",
    });
  });

  it("should fetch country entity", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query ($representations: [_Any!]!) {
            _entities(representations: $representations) {
              ... on Country {
                countryCode
                name
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
      name: "Canada",
    });
  });
});
