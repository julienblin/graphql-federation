import * as nock from "nock";
import { basename, dirname, join } from "path";

/** Capture HTTP interactions and either record or replay them using nock. */
export const captureHttp = async <T>(
  fn: (context?: nock.BackContext) => Promise<T>,
  options?: nock.BackOptions
): Promise<T> => {
  nock.back.fixtures = join(
    dirname(expect.getState().testPath),
    "__nock__",
    basename(expect.getState().testPath, ".ts")
  );
  nock.back.setMode("record");
  const { nockDone, context } = await nock.back(
    expect
      .getState()
      .currentTestName.replace(/[^a-z0-9]/gi, "_")
      .toLowerCase() + ".json",
    options || {}
  );

  const result = await fn(context);
  nockDone();
  nock.back.setMode("wild");

  return result;
};
