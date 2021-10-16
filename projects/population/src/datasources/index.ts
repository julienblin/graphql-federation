import { CountriesNow } from "./countriesnow";

export const buildDataSources = () => ({
  countriesnow: new CountriesNow(),
});

export type DataSources = ReturnType<typeof buildDataSources>;
