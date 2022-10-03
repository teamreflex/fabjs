import { Fab } from '../'

describe('client', () => {
  it('throws an error when provided invalid credentials', () => {
    const test = () => {
      const client = new Fab({ userAgent: 'fab|android|playstore|1.0.0|10|Android SDK built for x86|google|en|US' });
    };
    expect(test).toThrow('API key or email and password are required');
  })
})