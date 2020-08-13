const fs = require('fs');
const json = require('../../../src/encoders/json');

jest.mock('fs');

describe('Encoder: JSON', function () {
  it('parses a JSON file', async function () {
    const data = { field: 'mock' };
    fs.writeFileSync.mockReturnValue('mock');
    await json(data, 'path-mock');
    expect(fs.writeFileSync).toHaveBeenCalledWith('path-mock', JSON.stringify(data, null, 2));
  });
});
