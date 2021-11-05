#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

environment = process.env["NODE_ENV"] || "prod";

if (!["dev", "prod"].includes(environment)) {
  console.error(`Unknown environment ${environment}.`);
  process.exit(1);
}

if (fs.existsSync(path.join(__dirname, "dist"))) {
  fs.rmSync(path.join(__dirname, "dist"), { recursive: true, force: true });
}

let runningServer = null;

const startPlugin = () => {
  return {
    name: "startPlugin",
    setup(build) {
      build.onEnd((res) => {
        if (runningServer) {
          console.log(`♻️ ${path.basename(__dirname)} service restarting...`);
          runningServer.stop().then(() => {
            purgeAppRequireCache(path.resolve(__dirname, "./dist/index.js"));
            runningServer = require("./dist/index").default;
          });
        } else {
          runningServer = require("./dist/index").default;
        }
      });
    },
  };
};

const purgeAppRequireCache = (buildPath) => {
  for (let key in require.cache) {
    if (key.startsWith(buildPath)) {
      delete require.cache[key];
    }
  }
};

const plugins = [require("esbuild-plugin-inline-import")()];
if (environment === "dev") {
  plugins.push(startPlugin());
}

require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node14",
    outdir: "dist",
    plugins,
    watch: environment === "dev",
    sourcemap: environment === "dev",
    minify: environment === "prod",
  })
  .catch(() => {
    process.exit(1);
  });
