import { Covid19 } from "./covid19";

export const buildDataSources = () => ({
  covid19: new Covid19(),
});

export type DataSources = ReturnType<typeof buildDataSources>;
