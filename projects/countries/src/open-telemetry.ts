import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NodeTracerProvider } from "@opentelemetry/node";
import { Resource } from "@opentelemetry/resources";
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from "@opentelemetry/tracing";
import config from "./config";

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new GraphQLInstrumentation(),
  ],
});

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      "service.name": config.serviceName,
    })
  ),
});

provider.addSpanProcessor(
  config.environment === "dev"
    ? new SimpleSpanProcessor(
        new ZipkinExporter({
          url: config.openTelemetryUrl,
        })
      )
    : new BatchSpanProcessor(
        new ZipkinExporter({
          url: config.openTelemetryUrl,
        })
      )
);

provider.register();
