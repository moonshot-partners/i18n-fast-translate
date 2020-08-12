const fs = require('fs');
const yaml = require('../../../src/decoders/yaml');

jest.mock('fs');

describe('Decoders: Yaml', function () {
  it('parses a JSON file', async function () {
    const yamlMock = `message: hello`;
    fs.readFileSync.mockReturnValue(yamlMock);
    expect(yaml('path-mock')).toEqual({ message: 'hello' });
    expect(fs.readFileSync).toHaveBeenCalledWith('path-mock', 'utf8');
  });
});
