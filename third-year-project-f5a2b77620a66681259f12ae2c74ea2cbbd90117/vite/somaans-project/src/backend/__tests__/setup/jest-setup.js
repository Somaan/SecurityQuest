// jest.config.js
module.exports = {
    // The test environment that will be used for testing
    testEnvironment: 'node',
    
    // The glob patterns Jest uses to detect test files
    testMatch: [
      "**/__tests__/**/*.js",
      "**/?(*.)+(spec|test).js"
    ],
    
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
      '/node_modules/'
    ],
    
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/__tests__/"
    ],
    
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
      "text",
      "lcov",
      "html"
    ],
    
    // The root directory that Jest should scan for tests and modules within
    rootDir: '.',
    
    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: [
      './__tests__/setup/jest-setup.js'
    ],
    
    // A map from regular expressions to paths to transformers
    transform: {},
    
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  };