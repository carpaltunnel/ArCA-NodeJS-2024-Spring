function randomBooleanGenerator() {
  return Math.random < 0.5;
};

const vehicle = {
  make: 'Toyota',
  model: 'Tacoma',
  year: 2014,
}

console.log(`The vehicle weighs : ${vehicle.weight}`);

const num = 30;
if (num > 27) {

} else if (num === 35) {
    
}

function print(list: string | string[]) {
  console.log(list.length); // Valid
  list.slice(0, 3);  // Valid
  list.substring(0, 3); // Invalid

  if (typeof list === 'string') {
    console.log(list.substring(0, 3)); // Valid (narrowed)
  }

}

function doWork(param1: string, ...param2: number[]) {
  // ...
}

const numArray = [1, 2, 3, 4];
doWork('test', ...numArray);