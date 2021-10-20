import { gql } from "apollo-server-core";
import { Country } from "../src/schema.types";
import { server } from "../src/server";
import { captureHttp } from "./nock-support";

describe("countries", () => {
  it("should fetch countries", async () => {
    const result = await captureHttp(async () => {
      return await server.executeOperation({
        query: gql`
          query GetCountries {
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
          query GetCountries {
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
});
