const zip = (...arrays: Array<Array<any>>): Array<any> => {
    let resArray = [];
    let maxLen = Math.max(...arrays.map((arr) => arr.length));

    for (let i = 0; i < maxLen; i++) {
      resArray.push([]);
      
      for (let j = 0; j < arrays.length; j++) {
        resArray[i][j] = arrays[j][i];
      }
    }
  
    return resArray;
};

let gfg = zip(
    ['Amit', 'Akash'], 
    [1, 2, 3], 
    ['pass', 'pass', 'fail']
);


