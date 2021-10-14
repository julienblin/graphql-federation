
require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: "node",
  target: "node14",
  outdir: "dist",
  plugins: [require('@luckycatfactory/esbuild-graphql-loader').default()],
}).catch(() => {
  process.exit(1);
});
