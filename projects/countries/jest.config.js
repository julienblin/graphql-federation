/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist/"],
  coveragePathIgnorePatterns: ["test/"],
  reporters: ["default"],
  coverageReporters: ["text", "lcov", "cobertura"],
  transform: {
    "\\.tsx?$": "esbuild-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
  },
};
