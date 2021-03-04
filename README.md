# deep-copy
This microlibrary provides a deep copy of a given object or array.

## Usage
Install the library:
```bash
npm install @ardentia/deep-copy
```

Then, in the file where you want to use it:
```typescript
//ES6 / TypeScript

import getItemCopy from '@ardentia/deep-copy';

//...
const copy = getItemCopy(<value>);
```

```javascript
//node.js

const getItemCopy = require('@ardentia/deep-copy/node').default;

//...
const copy = getItemCopy(<value>);
```

The library is built to be ES6-, TypeScript and node.js-compatible.

### Examples:

The values of the given object are recursively traversed and are also deep copied in case they are not primitive types. If the value is a primitive type, a copy by value is returned.

```javascript
//...
const myCustomObject = { 
  numberVal: 1,
  stringVal: 'string',
  arrayVal: [{ foo: 'bar' }, 1, 2, 3],
  objectVal: { foo: 'bar', innerArray: [1, 2, 3] }
};

const objectCopy = getItemCopy(myCustomObject);

console.log(Object.is(objectCopy, myCustomObject)); 
//false -> deep copy of object

console.log(Object.is(objectCopy.numberVal, myCustomObject.numberVal)); 
//true -> primitive type copied by value

console.log(Object.is(objectCopy.stringVal, myCustomObject.stringVal)); 
//true -> primitive type copied by value

console.log(Object.is(objectCopy.arrayVal, myCustomObject.arrayVal)); 
//false -> deep copy of array

console.log(Object.is(objectCopy.arrayVal[0], myCustomObject.arrayVal[0])); 
//false -> deep copy of object

console.log(Object.is(objectCopy.objectVal, myCustomObject.objectVal)); 
//false -> deep copy of object

console.log(Object.is(objectCopy.objectVal.innerArray, myCustomObject.objectVal.innerArray)); 
//false -> deep copy of array
```

Same deep copy logic applies to array members:
```javascript
//...
const myCustomArray = [
  1,
  'string',
  { foo: 'bar', innerArray: [1, 2, 3] },
  [{ foo: 'bar'}, 1, 2, 3]
];

const arrayCopy = getItemCopy(myCustomArray);

console.log(Object.is(arrayCopy, myCustomArray)); 
//false -> deep copy of array

console.log(Object.is(arrayCopy[0], myCustomArray[0]));
//true -> primitive type copied by value

console.log(Object.is(arrayCopy[1], myCustomArray[1]));
//true -> primitive type copied by value

console.log(Object.is(arrayCopy[2], myCustomArray[2]));
//false -> deep copy of object

console.log(Object.is(arrayCopy[2].innerArray, myCustomArray[2].innerArray));
//false -> deep copy of array

console.log(Object.is(arrayCopy[3], myCustomArray[3])); 
//false -> deep copy of array

console.log(Object.is(arrayCopy[3][0], myCustomArray[3][0])); 
//false -> deep copy of object
```

**Note:** If the object you are attempting to copy contains children that recursively reference their parent object, the call to `getItemCopy(...)` will cause a range error exception: `Range Error: Maximum call stack size exceeded`. If such an object structure is possible in your case, you need to place the call to `getItemCopy(...)` in a try-catch construction:

```typescript
import getItemCopy from '@ardentia/deep-copy';

const rootObj = {
  childA: null,
  childB: null
};

const childA = {
  a1: 'a1',
  a2: 'a2',
  root: rootObj
};

rootObj.childA = childA;

const childB = {
  b1: 'b1',
  b2: 'b2',
  root: rootObj
};

try {
  const result = getItemCopy(rootObj);
} catch(ex) {
  // handle the range error exception
}
```
## Local Development
1. Fork the project and clone it locally
2. `npm install` to install the library dependencies
3. `npm install -g typescript` to install TypeScript globally
4. `npm test` to run tests
5. `npm run build` to build for production
