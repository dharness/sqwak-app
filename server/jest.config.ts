import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  silent: false,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  globalTeardown: "./jest.globalTeardown.js",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
};

export default config;
