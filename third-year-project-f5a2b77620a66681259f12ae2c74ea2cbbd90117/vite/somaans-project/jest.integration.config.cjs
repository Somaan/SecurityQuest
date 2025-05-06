module.exports = {
  testEnvironment: 'node',
  testTimeout: 60000, // Increase timeout from 30s to 60s
  moduleNameMapper: {
    '^@sendgrid/mail$': '<rootDir>/src/__mocks__/@sendgrid/mail.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
  forceExit: true // Force Jest to exit after tests complete
};