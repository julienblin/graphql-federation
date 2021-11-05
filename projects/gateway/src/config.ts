export default {
  environment: process.env["NODE_ENV"] || "development",
  openTelemetryUrl:
    process.env["OPENTELEMETRY_URL"] || "http://zipkin:9411/api/v2/spans",
  serviceName: "gateway",
};
