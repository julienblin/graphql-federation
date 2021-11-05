import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NodeTracerProvider } from "@opentelemetry/node";
import { Resource } from "@opentelemetry/resources";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import config from "./config";

registerInstrumentations({
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      "service.name": config.serviceName,
    })
  ),
});

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ZipkinExporter({
      url: config.openTelemetryUrl,
    })
  )
);

provider.register();
