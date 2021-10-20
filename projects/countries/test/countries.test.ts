import { gql } from "apollo-server-core";
import { server } from "../src/server";
import { capture } from "./nock-support";

describe("countries", () => {
  it("should fetch countries", async () => {
    const result = await capture(async () => {
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
});
