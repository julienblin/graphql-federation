/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist/"],
  coveragePathIgnorePatterns: ["test/", "graphql"],
  reporters: ["default"],
  coverageReporters: ["text", "lcov", "cobertura"],
  transform: {
    "\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
    "\\.(gql|graphql)$": "jest-transform-graphql",
  },
};
