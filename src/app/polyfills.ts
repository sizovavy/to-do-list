interface Callback<T1, T2> {
    (item: T1, index: number, array: Array<T1>): T2;
  }
  
  interface Callback2<T> {
    (item: T, index: number, array: Array<T>): boolean;
  }
  
  interface Callback3<T1, T2> {
    (accumulator: T1 | T2, item: T1, index: number, array: Array<T1>): T1 | T2;
  }
  
  function map<T1, T2>(array: Array<T1>, callback: Callback<T1, T2>): Array<T2> {
    const emptyArray = [];
  
    let newArray: Array<T2> = emptyArray;
  
    for (let i = 0; i < array.length; i++) {
      // newArray.push(callback(array[i], i, array));
      newArray = [...newArray, callback(array[i], i, array)];
    }
  
    return newArray;
  }
  
  function filter<T>(array: Array<T>, callback: Callback2<T>): Array<T> {
    const emptyArray = [];
  
    let newArray: Array<T> = emptyArray;
  
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        newArray = [...newArray, array[i]];
      }
    }
  
    return newArray;
  }
  
  function some<T>(array: Array<T>, callback: Callback2<T>): boolean {
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        return true;
      }
    }
  
    return false;
  }
  
  function reduce<T1, T2>(
    array: Array<T1>,
    callback: Callback3<T1, T2>,
    ...initialValue: Array<T2>
  ): T1 | T2 {
    if (!array.length && !initialValue.length) {
      throw new TypeError('Empty array without initial value');
    }
  
    const valueIndex = 0;
    const indexIncrement = 1;
  
    let index = 0;
    let value: T1 | T2;
  
    if (initialValue.length) {
      value = initialValue[valueIndex];
    } else {
      value = array[index];
      index = index + indexIncrement;
    }
  
    for (; index < array.length; index++) {
      value = callback(value, array[index], index, array);
    }
  
    return value;
  }