const zip = (...arrays: Array<Array<any>>): Array<any> => {
    let resArray = [];

    for(let i = 0; i < arrays[0].length; i++){
      arrays.forEach(array => resArray.push(array[i]))
    }

    return resArray
}

let gfg = zip(
    ['Amit', 'Akash', 'Avijit'], 
    [1, 2, 3], 
    ['pass', 'pass', 'fail']
);        
