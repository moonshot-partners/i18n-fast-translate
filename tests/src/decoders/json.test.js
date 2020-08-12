const fs = require('fs');
const json = require('../../../src/decoders/json');

jest.mock('fs');

describe('Decoders: JSON', function () {
  it('parses a JSON file', async function () {
    fs.readFileSync.mockReturnValue(JSON.stringify({ message: 'hello' }));
    expect(json('path-mock')).toEqual({ message: 'hello' });
    expect(fs.readFileSync).toHaveBeenCalledWith('path-mock', 'utf8');
  });
});
