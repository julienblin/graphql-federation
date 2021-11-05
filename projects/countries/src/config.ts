export default {
  battutaApiKey: process.env["BATTUTA_API_KEY"]!,
  environment: process.env["NODE_ENV"] || "development",
  openTelemetryUrl:
    process.env["OPENTELEMETRY_URL"] || "http://zipkin:9411/api/v2/spans",
  serviceName: "countries",
};
