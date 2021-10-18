import { gql } from "apollo-server-core";
import * as nock from "nock";
import { basename, dirname, join } from "path";
import { server } from "../src/server";

describe("Fetch countries", () => {
  it("should be ok", async () => {
    nock.back.fixtures = join(dirname(expect.getState().testPath), "__nock__");
    nock.back.setMode("record");
    const { nockDone, context } = await nock.back(
      basename(expect.getState().testPath, ".ts") +
        "." +
        expect
          .getState()
          .currentTestName.replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()
    );

    const result = await server.executeOperation({
      query: gql`
        query GetCountries {
          countries {
            countryCode
            name
          }
        }
      `,
    });
    nockDone();

    expect(result.errors).toBeFalsy();
    expect(result.data.countries.length).toBeTruthy();
  });
});
