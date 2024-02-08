# Modules
We've looked at creating classes in a single script but, as your projects grow more complex, you'll want to separate them out into self contained modules.  Modules can basically be thought of as classes that expose some or all of their functionality.  After all, they're usually just a class that exports a class or portions of a class as a module such that they can be imported elsewhere with the `require()` syntax.

## Creating a Module
Let's use our Vehicle class from the previous example and turn it into a module.  Create a new file to hold only your module code, something like `vehicle.js`.  Then, drop your Vehicle class code into it.

```javascript
'use strict';

class Vehicle {
  constructor (make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  myMake() {
    console.log(`My make is : ${this.make}`);
  }

  myModel = () => {
    console.log(`My model is : ${this.model}`);
  }

  static iAmA() {
    console.log('I am a vehicle');
  }
}

module.exports = Vehicle;
```

Now, in a different file (let's say `test.js`) `require()` and use your Vehicle module.
```javascript
'use strict';
cont Vehicle = require('./vehicle');

// Create instance of Vehicle and invoke constructor
const myVehicle = new Vehicle('Tesla', 'S', 2020);
myVehicle.myMake();
myVehicle.myModel();
Vehicle.iAmA();
```

Note that these two scripts are assumed to be in the same directory so the local directory reference "./" was used.  Also, you don't need to include the file extension - `./vehicle` is assumed to be `./vehicle.js`.

## module.exports
There are three main ways to use `module.exports`.  The first is as you saw above where you simply export an entire class.  This is probably the most common.

You can also export specific properties like the following :
```javascript
module.exports = {
  USERS_TABLE: 'users',
  ERROR_PAGE: 'error.html',
  ADMIN_PERMISSION: 'global-admin',
}
```
I use this pretty commonly for a "Constants" module so I can refer to a variable that contains a static string that I may use multiple places.  The reason this is convenient is that if you need to change that string then you only need to change it in your Constants module, not in every single place you may have it hardcoded.  I usually do this for database table names, permissions, and specific parameter values that I use as flags... basically anywhere I want to hardcode a string once and potentially only have to change it in one place.

Similarly, you can export only specific functions of a class :
```javascript
'use strict';
class AStaticClass {
  static printSum(x, y) {
    console.log(x + y);
  }

  static printDifference(x, y) {
    console.log(x - y);
  }
}

module.exports = {
    sum: AStaticClass.printSum,
    diff: AStaticClass.printDifference,
  }
```


## Global Singletons
Another convenient, but less common, usage is to create a global singleton.  A global singleton is an instance of a class or object that is created once and potentially shared across your entire project.  You do need to be careful with singletons, but they have their place.  The main reasoning for this when you want to create an object once, potentially one that is expensive to create, then use it multiple times.  

This should always be used with care, but this is how you do it :

```javascript
'use strict';
class GlobalSingleton {
  static aFunction() {
    // just a function
  }
}

module.exports = new GlobalSingleton();
```

Note that the `module.exports` is exporting an instance of GlobalSingleton.  Since the module is cached, the instance only gets created once and the single instance is always returned when the module is `require()`d.