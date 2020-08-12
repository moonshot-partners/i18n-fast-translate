const Google = require('../../../src/providers/google');
const GoogleCloud = require('@google-cloud/translate');

jest.mock('@google-cloud/translate');

describe('Google Cloud Translate', function () {
  beforeEach(() => jest.restoreAllMocks());

  GoogleCloud.v2.Translate.mockReturnValue({
    translate: async () => {
      return ['google mock'];
    }
  });

  it('translates a text', async function () {
    const result = await Google({
      text: 'hello',
      to: 'en'
    });

    expect(result).toEqual('google mock');
  });
});
