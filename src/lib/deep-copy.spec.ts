import 'jasmine';
import { copyArrayItems, copyObjectEntries, isObject } from './deep-copy';
import getItemCopy from './deep-copy'

describe('isObject(...)', () => {
  it('should return true only when a valid object is passed', () => {
    let result = isObject({ foo: 'bar' });
    expect(result).toBe(true, 'returns true when an object is passed');

    result = isObject(null);
    expect(result).toBe(false, 'returns false when null is passed');

    result = isObject([1, 2, 3]);
    expect(result).toBe(false, 'returns false when an array is passed');

    result = isObject(1);
    expect(result).toBe(false, 'returns false when a number is passed');

    result = isObject('string');
    expect(result).toBe(false, 'returns false when a string is passed');

    result = isObject(undefined);
    expect(result).toBe(false, 'returns false when undefined is passed');
  });
});

describe('copyArrayItems(...)', () => {
  it('should return new copy of a given array', () => {
    const testArr = [1, 'string', ['subarrayItem'], { foo: 'bar' }];
    const result = copyArrayItems(testArr);

    expect(testArr).toEqual(result, 'the result array members have the same values');
    expect(Object.is(testArr, result)).toBe(false, 'the result is not a reference');
    expect(compareMembersByReference(testArr, result)).toBe(false, 'copied data structure members are not references');
  });
});
 
describe('copyObjectEntries(...)', () => {
  it('should return new copy of a given object', () => {
    const testObj = { 
      foo: 1,
      bar: 'string',
      arr: [1, 'string', ['subarrayItem'], { foo: 'bar' }],
      objProp: { foo: 'bar' }
    };

    const result = copyObjectEntries(testObj);

    expect(testObj).toEqual(result, 'the result object members have the same values');
    expect(compareMembersByReference(testObj, result)).toBe(false, 'copied data structure members are not references');
    expect(Object.is(testObj, result)).toBe(false, 'the result is not a reference');
  });
});

describe('getItemCopy(...)', () => {
  it('should return new copy of a given object', () => {
    const testObj = { 
      foo: 1,
      bar: 'string',
      arr: [1, 'string', ['subarrayItem'], { foo: 'bar' }],
      objProp: { foo: 'bar' }
    };

    const result = getItemCopy(testObj);

    expect(testObj).toEqual(result, 'the result object members have the same values');
    expect(Object.is(testObj, result)).toBe(false, 'the result is not a reference');
    expect(compareMembersByReference(testObj, result)).toBe(false, 'the copied data structure members are not references');
  });

  it('should return new copy of a given array', () => {
    const testArr = [1, 'string', ['subarrayItem'], { foo: 'bar' }];
    const result = getItemCopy(testArr);

    expect(testArr).toEqual(result, 'the result array members have the same values');
    expect(Object.is(testArr, result)).toBe(false, 'the result is not a reference');
    expect(compareMembersByReference(testArr, result)).toBe(false, 'the copied data structure members are not references');
  });
});

function compareMembersByReference(item1: any, item2: any): boolean {
  let refsAreSame = false;

  if (isObject(item1) && isObject(item2)) {
    for (const prop in item1) {
      if (typeof item1[prop] === 'object') {
        refsAreSame = Object.is(item1[prop], item2[prop]);
      }

      if (refsAreSame) {
        break;
      }
    }
  }

  if (Array.isArray(item1) && Array.isArray(item2)) {
    item1.forEach((member: any, index: number) => {
      if (typeof member === 'object') {
        refsAreSame = Object.is(member, item2[index]);
      }
    })
  }

  return refsAreSame;
}