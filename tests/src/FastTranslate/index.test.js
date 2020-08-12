const FastTranslate = require('../../../src/FastTranslate');
const Google = require('../../../src/providers/google');
const JSONDecoder = require('../../../src/decoders/json');
const JSONEncoder = require('../../../src/encoders/json');

jest.mock('../../../src/decoders/json');
jest.mock('../../../src/encoders/json');
jest.mock('../../../src/providers/google');

describe('FastTranslate', function () {
  beforeEach(() => jest.restoreAllMocks());

  describe('Provider: Google', function () {
    describe('Format: JSON', function () {
      it('translates json file', async function () {
        Google.mockResolvedValue('google-translate-mock');
        JSONEncoder.mockResolvedValue('mock');
        JSONDecoder.mockReturnValueOnce({ firstName: 'jorge', lastName: 'Hernandez' }) // US
          .mockReturnValueOnce({ firstName: 'Josue' }); // ES

        const expectedOutput = { firstName: 'Josue', lastName: 'google-translate-mock' };
        const result = await FastTranslate({
          base: 'english.json',
          target: 'spanish.json',
          format: 'json'
        });

        expect(JSONEncoder).toHaveBeenCalledWith(expectedOutput, 'spanish.json');
        expect(result).toEqual(expectedOutput);
      });
    });
  });
});
