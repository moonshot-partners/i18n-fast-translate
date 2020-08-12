const fs = require('fs');
const yamlEncoder = require('../../../src/encoders/yaml');
const yaml = require('yaml');
jest.mock('fs');

describe('Encoder: JSON', function () {
  it('parses a JSON file', async function () {
    const data = { field: 'mock', nested: { field: 'mock' } };
    fs.writeFileSync.mockReturnValue('mock');
    await yamlEncoder(data, 'path-mock');
    expect(fs.writeFileSync).toHaveBeenCalledWith('path-mock', yaml.stringify(data));
  });
});
