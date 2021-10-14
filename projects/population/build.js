#!/usr/bin/env node

const path = require("path");

const [mode, port, ...remainingArgs] = process.argv.slice(2);

if (!["dev", "prod"].includes(mode)) {
  console.error(`Unknown mode ${mode}.`);
  process.exit(1);
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
            purgeAppRequireCache(path.resolve(__dirname, "./dist/server.js"));
            runningServer = startServer();
          });
        } else {
          runningServer = startServer();
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

const startServer = () => {
  const server = require("./dist/server").server;
  server.listen(parseInt(port)).then(({ url }) => {
    console.log(`🚀 ${path.basename(__dirname)} service ready at ${url}`);
  });
  return server;
};

const plugins = [require("@luckycatfactory/esbuild-graphql-loader").default()];
if (mode === "dev") {
  plugins.push(startPlugin());
}

require("esbuild")
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node14",
    outdir: "dist",
    plugins,
    watch: mode === "dev",
    sourcemap: mode === "dev",
  })
  .catch(() => {
    process.exit(1);
  });
