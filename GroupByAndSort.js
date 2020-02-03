//// Written by Sanjev Saalaivazan, took me 30 minutes more to get the correct logic and syntax
//// email: s.sanjev@yahoo.com
//// I have given two flavours of groupby and then orderby, one of them was the requirement i guess.

//// groupByAndSortOnNameThenCountArray(['banana', 'apple', 'apx','banana', 'apricot', 'banana', 'apricot',  'apx']);
//// groupByAndSortOnCountThenNameArray(['banana', 'apple', 'apx', 'banana', 'apricot', 'banana', 'apricot', 'apx']);

//// Groups By Name and then Sorts onName and within that Sorts on Count
const groupByAndSortOnNameThenCountArray = (transactions) => {
  if(!transactions) return null;  
  //Dedupe below using natives
  let mySet = new Set(transactions); 
  // create a obj to hold deduped 
  let kvp = {};
  mySet.forEach( (key) =>{    
    kvp[key] = 0;
  });
  for(let i =0 ; i < transactions.length; i++){    
    kvp[transactions[i]] = ++(kvp[transactions[i]]);    
  }
  // use complex key for array sort as per requirement
  let result = [];
  for (let [key, value] of Object.entries(kvp)) {
    result.push(`${key} ${value}`);
  }

  result.sort();
  console.log(result);
}

//// Groups By Name and then Sorts on Count and within that Sorts on Name
const groupByAndSortOnCountThenNameArray = (transactions) => {
  if(!transactions) return null;  
  //Dedupe below using natives
  let mySet = new Set(transactions);  
  // create a obj to hold deduped
  let kvp = {};
  mySet.forEach( (key) =>{    
    kvp[key] = 0;
  });  
  for(let i =0 ; i < transactions.length; i++){    
    kvp[transactions[i]] = ++(kvp[transactions[i]]);    
  }
  // move to array to use sort
  let result = [];
  for (let [key, value] of Object.entries(kvp)) {
    result.push({ key: key, value: value, sortexpression: `${value} ${key}`});
  }
  result.sort(compareComplex);

  // show results
  const result2 = result.map( r => {
    return r.sortexpression;
  })
  console.log(result2);
}

//// 
const compareComplex = (a, b) => {
  const exp1 = a.key.toLowerCase();
  const exp2 = b.key.toLowerCase();
 // Sort on name only if count are same
 if(a.value === b.value) {
  if (exp1 > exp2) return 1;
  if (exp2 > exp1) return -1;
  return 0;
 }

  if (a.value < b.value) return 1;
  if (b.value < a.value) return -1;
  return 0;
}
