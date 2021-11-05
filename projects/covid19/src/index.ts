import config from "./config";
import "./open-telemetry";
import { server } from "./server";

server
  .listen(process.env["PORT"])
  .then(({ url }) => {
    console.log(`🚀 ${config.serviceName} service ready at ${url}`);
  })
  .catch((err) => console.error(err));

export default server;
