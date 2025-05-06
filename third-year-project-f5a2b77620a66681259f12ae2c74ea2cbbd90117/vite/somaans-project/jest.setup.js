// Mock SendGrid
jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn().mockResolvedValue([{ statusCode: 202 }])
  }));
  
  // Mock other dependencies if needed
  console.log('Test environment mocks configured');