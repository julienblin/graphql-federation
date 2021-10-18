/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist/"],
  coveragePathIgnorePatterns: ["test/"],
  reporters: ["default"],
  coverageReporters: ["text", "lcov", "cobertura"],
};
