type CallbackMap<I, R = I> = (item: I, index: number, array: Array<I>) => R;
  
  
type CallbackSomeFilter<T> = (item: T, index: number, array: Array<T>) => boolean;

  
type CallbackReduce1<T1, T2> = (accumulator: T2, item: T1, index: number, array: Array<T1>) => T2;

type CallbackReduce2<T> = (accumulator: T, item: T, index: number, array: Array<T>) => T;

type CallbackReduceImpl<T1, T2> = (accumulator: T1 | T2, item: T1, index: number, array: Array<T1>) => T1 | T2;

  
   const map = <T1, T2>(array: Array<T1>, callback: CallbackMap<T1, T2>, thisArg): Array<T2> => {
    const newArray: Array<T2> = [];    
  
    for (let i = 0; i < array.length; i++) {
      newArray.push(callback.call(thisArg, array[i], i, array));
    }
  
    return newArray;
  }

  const filter = <T>(array: Array<T>, callback: CallbackSomeFilter<T>, thisArg): Array<T> => {
    const newArray: Array<T> = [];
  
    for (let i = 0; i < array.length; i++) {
      if (callback.call(thisArg, array[i], i, array)) {
        newArray.push(array[i]);
      }
    }
  
    return newArray;
  }
  
  const some = <T>(array: Array<T>, callback: CallbackSomeFilter<T>, thisArg): boolean => {
    for (let i = 0; i < array.length; i++) {
      if (callback.call(thisArg, array[i], i, array)) {
        return true;
      }
    }
  
    return false;
  }

  const every = <T>(array: Array<T>, callback: CallbackSomeFilter<T>, thisArg): boolean => {
    for (let i = 0; i < array.length; i++) {
      if (!callback.call(thisArg, array[i], i, array)) {
        return false;
      }
    }
  
    return true;
  }

  interface Reduce {
    <T1, T2>(
      array: Array<T1>,
      callback: CallbackReduce1<T1, T2>,
      initialValue: T2
    ): T2;
    <T>(
      array: Array<T>,
      callback: CallbackReduce2<T>,
      initialValue: T
    ): T;
  }

  const reduce: Reduce = function<T1, T2>(
    array: Array<T1>,
    callback: CallbackReduceImpl<T1, T2>,
    initialValue?: T1 | T2
  ): T1 | T2{
    const hasInitialValue = arguments.length === 2;
    
    if (!array.length && hasInitialValue) {
      throw new TypeError('Empty array without initial value');
    }  
    
    const indexIncrement = 1;
  
    let index = 0;
    let value: T1 | T2;
  
    if (hasInitialValue) {
      value = initialValue;
    } else {
      value = array[index];
      index = index + indexIncrement;
    }

    while (index < array.length) {
        value = callback(value, array[index], index, array);
        index = index + indexIncrement;
    }  
  
    return value;
  }

  type friend  = {
    name: string,
    books: string[],
    age: number
  }

  const friends: friend[] = [
    { name: 'Anna', books: ['Bible', 'Harry Potter'], age: 21 },
    { name: 'Bob', books: ['War and peace', 'Romeo and Juliet'], age: 26 },
    { name: 'Alice', books: ['The Lord of the Rings', 'The Shining'], age: 18 }
  ];

  const initial: string = "0";
  let newarr = reduce(friends, (accumulator: number, currentValue: friend) => accumulator + currentValue.age, 0);

  friends.reduce((accumulator: friend, currentValue: friend) => currentValue)