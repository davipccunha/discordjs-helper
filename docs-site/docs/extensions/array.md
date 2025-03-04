---
title: Array
---

# `Array<T> Extensions`
The following methods have been added to the Array.prototype:

### random()
`random(): T`  
Returns a random element from the array

#### Example
```ts
const arr = [1, 2, 3, 4, 5, 6];
const n = arr.random();
```

___

### draw()  
`draw(number?: number): T[]`  
Returns `number` random different elements from the array

#### Parameters
`number?: number` - The number of elements to draw. Defaults to `1`

#### Example
```ts
const arr = [1, 2, 3, 4, 5, 6];
const n = arr.draw(2);
```