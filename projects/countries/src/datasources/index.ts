import { Battuta } from "./battuta";

export const buildDataSources = () => ({
  battuta: new Battuta(),
});

export type DataSources = ReturnType<typeof buildDataSources>;
