const MergeDiff = require('../../../src/MergeDiff');

describe('MergeDiff', function () {
  describe('Option: onlyMissingKeys: true', function () {
    it('merges only missing keys', async function () {
      const baseObject = {
        firstName: 'Jorge',
        lastName: 'Hernandez',
        metadata: {
          id: 1,
          key: 'key'
        },
        age: 27
      };

      const targetObject = {
        firstName: 'Josue',
        lastName: 'Hernandez',
        metadata: {
          id: 5
        }
      };

      const result = await MergeDiff(baseObject, targetObject);
      const resultExpected = { ...targetObject, age: 27, metadata: { id: 5, key: 'key' } };
      expect(result).toEqual(resultExpected);
    });
  });

  describe('Option: onlyMissingKeys: false', function () {
    it('merges all', async function () {
      const baseObject = {
        firstName: 'Jorge',
        lastName: 'Hernandez',
        metadata: {
          id: 1,
          key: 'key'
        },
        age: 27
      };

      const targetObject = {
        firstName: 'custom',
        lastName: 'custom',
        metadata: {
          id: 5
        }
      };

      const result = await MergeDiff(baseObject, targetObject, { onlyMissingKeys: false });
      expect(result).toEqual(baseObject);
    });
  });

  describe('Option: set', function () {
    it('merges all', async function () {
      const baseObject = {
        firstName: 'Jorge',
        lastName: 'Hernandez',
        metadata: {
          id: 1,
          key: 'key'
        },
        age: 27
      };

      const targetObject = {
        firstName: 'custom',
        lastName: 'custom',
        metadata: {
          id: 5
        }
      };

      const result = await MergeDiff(baseObject, targetObject, { set: async () => 'missing' });
      const resultExpected = {
        firstName: 'custom',
        lastName: 'custom',
        metadata: {
          id: 5,
          key: 'missing'
        },
        age: 'missing'
      };
      expect(result).toEqual(resultExpected);
    });
  });
});
