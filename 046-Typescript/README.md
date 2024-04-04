# Typescript
Why Typescript?  Similar to how ES6 fixed a lot of the inherent nastiness of Javascript, Typescript's purpose is to go further and make it more difficult to make logical errors that can wreak havoc on your application.  Perhaps most importantly, Typsescript introduces... static types (guessed that from the name, did you?).  We talked at length about how Javascript is loosely / dynamically typed and how things can go sideways without careful coding and knowledge of implicit type conversion weirdness.  Typescript tries to impose order on types by requiring (if enabled) static type declarations.  Basically, Typescript acts as a translation layer for Javascript that allows us to enforce typing.

Typescript is simply a more rigid implementation on top of Javascript.  When you write and transpile Typescript, the result will be plain old Javascript that is executable anywhere but will have already been checked for compliance with the Typescript constructs.

## An Example
```javascript
function randomBooleanGenerator() {
  return Math.random < 0.5;
}
``` 
Looks fine at first glance, right?  Javascript surely wouldn't complain if you executed this... up until it throws an exception that `Math.random` does not exist.  This should be a function call, not a property accessor.  The correct usage would be `Math.random()` but Javascript has no way to tell you this until runtime.  Typescript, however, does.  And, with IDE integration you can see the problem before you even try to transpile it.

Another good example of how Typescript can help you out is on undefined properties, like below :
```javascript
const vehicle = {
  make: 'Toyota',
  model: 'Tacoma',
  year: 2014,
}

console.log(`The vehicle weighs : ${vehicle.weight}`);
```

While this is perfectly acceptable Javascript code, the `weight` property is not defined and would result in `The vehicle weighs : undefined` which clearly isn't what we want.

Typescript, however, will throw an error to notify you that you're attempting to use an undefined variable.

Typescript can also help you easily find conditionals that aren't possible to fulfill.  While you're probably avoiding them already, it couldn't hurt to have a second check.  In the example below, it's clear that the `else if` will never execute because the original `if` will catch the condition and not proceed to the `else if`.  Typescript will catch this problem for you.

```javascript
const num = 30;

if (num > 27) {

} else if (num === 35) {
    
}
```


## `tsc` Compiling
Install the Typescript compiler with NPM (-g) or by downloading it.

Typescript files have a ".ts" extension by default.  We will write Typescript in .ts files, then compile and check it with `tsc <filename>`.

Consider the following script being named "console.ts" : 
```javascript
// test
console.log('Hi there');
```

We can compile it with `tsc console.ts` and tsc will generate a `console.js` output file.  You can compare the two and see that nothing really changed because we aren't using any of the Typescript functionality yet.  Since the input is simple Javascript, the output is simple Javascript.

`tsc` can specify the version of Javascript to target but defaults to ES3.  We've learned ES2015 (ES6) so we'll use that for our Typescript compilation target.  The version is specified by the `--target` parameter to `tsc` : 
`tsc --target es2015 testfile.ts`

There are multiple tsc arguments that may be used to validate your code more strictly.  These arguments can be passed on the command line, or configured in a `tsconfig.json` for ease of re-use.  The three you'll find most important are : 
1.  `--strictNullChecks` - Require explicit null checking
2. `--noImplicitAny` - Error when an implicit "any" type is found
3. `--strict` - Enable all strict type checking options 

Take note that Typescript can also check that our function calls match the expected parameters and error if not.  That is, if you called `function test(param1, param2)` with `test(param1)` if would generate an error.

## Types
Typescript has support for the Javascript primitive types of string, number, and boolean.  It also supports arrays of a specific type.  In Typescript, the type is always specified after the thing being typed, followed by a colon.  Below are examples of declaring variables with specific types :
```typescript
let name: string = 'test';
const age: number = 25;
const hobbies: string[] = ['knitting', 'cycling', 'swimming'];
```

The same behavior can be used to specify the types of parameters to function calls.
```typescript
function doWork(what: string, howLong: number, why: string[]) {

}
```

And, we can take it a step further to specify return types from functions.
```typescript
function doWork(what: string): boolean {
  return false;
}
```

In addition to primitive types, Typescript also supports Object types which will probably be the most commonly used.  I'll introduce the idea here, but it's more likely that you would create a new type for reuse (see "Defining Complex Types" below) rather than explictly defining the object type in multiple locations.
```typescript
function doWork(work: { what: string, when: number, why?: string[] }): boolean {
  return false;
}
```

In this example, we define that the doWork() function accepts one parameter named "work", which is an Object type that will contain three properties : what, when, and why.

Properties can be made optional by appending a question mark to the property name as shown above on the "why" property.  If a property is optional, an undefined check should be done before using it to avoid potential errors. 

Types can be combined with Union types which allow the choice of multiple types for a property.  However, any use of the variable must either be "narrowed" or be a use that applies to all specified types.  Below is a parameter named "id" that can be either a string or a number :
```typescript
function print(id: string | number) {
  console.log(id);
}
```

You can "narrow" the code to allow for flexible usage by doing explicit type checking.  This allows you to use properties/functions of a specific type that aren't available on the other while maintaining Typescript compliance.  This is only required when using properties/functions on a union where every possible type does not share what you need to use.  For example, a union type of `string | string[]` could use `.length` or `.slice()` indscriminately but would generate an error if `.substr()` was used since the Array type does not have that function.

When a variable or parameter can be of any type, the `any` type can be used.  Declaring something as an `any` effectively eliminates much of the helpful type checking in Typescript so it should be avoided if possible.

## Defining Complex Types (Type Aliases)
Rather than define the type of every property, of every object, every time it is used, you can define a complex type to describe it once and then reuse it.  This is done with the `type` keyword.

```typescript
type Vehicle = {
  make: string,
  model: string,
  year: number,
};

function doSomething(vehicle: Vehicle) {

}
```

While that's probably the most common usage, you can also use it to define union types like so : 
```typescript
type sOnType = string | number;

function doSomething(param: sOnType) {}
```

## Interfaces
Previously we talked about how Javascript doesn't really support interfaces, but we can somewhat work around that by defining a class where each function that should be overridden throws an exception by default.  This clearly is not an interface, and could cause problems if a function that wasn't overridden is called, but it's the best we can do with what we've got.

Typescript, however, natively supports interfaces.  This is generically the same as the complex type definition above.


```typescript
interface Vehicle = {
  make: string,
  model: string,
  year: number,
};

function doSomething(vehicle: Vehicle) {

}
```
The main difference between an interface and a complex type is that types are declared once and constant whereas interface can be extended.

## Type Assertions
There are times when you will use a Javascript function or property that Typescript has no way to know the type of.  In these cases, you can specify it manually with an assertion.  Type assertions are made with the `as` keyword.  For example : 
```typescript
const result = someModule.doSomething() as string;
```

If Typescript's safety checks are ever too strict or incorrect, you can always cast the value as an `any`, but this reverts us to native Javascript rules and should only be done with care.

## Literal Types
Literal types allow us to define not only the type of a variable, but also the acceptable values.  If you remember "enum" from the JSON schema lesson, we can do the same thing here with literal types to specify values that are acceptable for a type with unions.

The `paint()` example below would only allow the specified values of red, blue, and green to be passed in.

```typescript
function paint(color: 'red' | 'blue' | 'green') {}
```

Literal types can be combined (using unions) with other defined types.  While not the best example, using our previous `Vehicle` type declaration we could also accept the string "none" as a valid input.

```typescript
type Vehicle = {
  make: string,
  model: string,
  year: number,
};

function doSomething(vehicle: Vehicle | 'none') {
}
```

## Other Types
So far we've only covered the basic and "old" Javascript types while showing how to use them with Typescript.  In the past, we talked about the newer types like BigInt and Symbol.  These are also available in Typescript :
```typescript
const bigNumber: bigint = BigInt(5000000);
```

## Function Type Signatures
Typescript also allows us to define the format and types of functions when they are passed as parameters.  The definitions is basically the same as an arrow function and can be found below.

```typescript
function output(fn: (a: string) => void) {
  fn("Hello, World");
}
```
The type definition on the `fn` parameter is stating that it is a function, it takes one parameter named `a` with type string, and returns nothing (void);

## Construct Signatures
Similar to function type signatures, Typescript allows us to provide the definition of constructors invoked with the `new` keyword.  These are the same as function signatures but prefixed with the `new` keyword to indicate that they are specifically for constructors.
```typescript
type myConstructor = {
  new (param: string): object;
};
```

If a function supports both a constructor and an invocation, they can be defined at the same time.
```typescript
type myConstructorOrInvocation = {
  new (param: string): object;
  (param: number): number;
};
```
In this example, the function being defined accepts a `param` string and returns an object for the constructor.  It accepts a `param` number and returns a number when being invoked.

## Generics
When a function can handle multiple different types and the output type will relate to the input type, we can use generics to document this.

```typescript
function myFunction<Type>(param: Type[]): Type {
  return param[0];
}
```
In this example we've defined a function that accepts an array of some type and returns a single instance of that same type.  Since the parameter could be an array of any type (string, number, etc) and the function will return that same type, the generic "Type" designator tells Typescript that they are related.

## Optional Function Parameters
It was stated earlier that Typescript can enforce proper function parameter calls to ensure that we are calling the correct function with the correct number of parameters.  To satisfy this constraint while allowing optional parameters we can mark them as "optional" with a question mark.

```typescript
function doWork(p1: string, p2?: number) {
  // p1 is required, p2 is optional
}

doWork('hi'); // Valid
doWork('hi', 2); // Valid
doWork(); // Invalid
```

## Function Overloads
We're accustomed to calling Javascript functions in many ways for flexibility.  Sometimes we call it one parameter, sometimes two, sometimes three, and sometimes with each parameter being a different type.  With what we've covered so far, with the exception of optional parameters, this isn't really possible since we require one type per parameter.  With function overloads, similar to Java, we can define multiple ways to call the same function in Typescript.

In Typescript, we do this by listing all of the function overloads before we list the function body.
```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);  
  } else {
    return new Date(mOrTimestamp);  
  }
}
const d1 = makeDate(12345678); // Valid
const d2 = makeDate(5, 5, 5); // Valid
const d3 = makeDate(1, 3); // Invalid
```

This defines two ways to call the `makeDate` function : 
1. With a single parameter, type number
2. With three parameters, each of type number

Strange, right?  Looks like we defined three signatures... 
The final signature is the "implementation signature" and must be compatible with the overloads but is not itself an overload.

## Special Types
1. `void` - When a function does not return a value.  Inferred when there is no `return` statement.
2. `object` - Any value that is not a primitive (note the case)
3. `unknown` - Similar to `any` but can never be used.
4. `never` - A type that can never happen, and therefore can never be used.
5. `Function` - To define a Function type but returns an `any`
   
## Rest Parameters
If you remember rest parameters from Javascript, we can define them similarly in Typescript.  Since they are transformed into an array, we can prefix them with the `...` rest operator and type them as an array (of a single type).
```typescript
function doWork(param1: string, ...param2: number[]) {
  // ...
}

doWork('test', 1, 2, 3, 4); // param1 = 'test', param2 = [1, 2, 3, 4]
```

Spread syntax can be used in the same way.  Using the same example as above we can do : 
```typescript
function doWork(param1: string, ...param2: number[]) {
  // ...
}

const numArray = [1, 2, 3, 4];
doWork('test', ...numArray); // param1 = 'test', param2 = [1, 2, 3, 4]
```

## Parameter Destructuring
Of course, parameter destructuring is available as well but with a slightly different syntax.  We simply need to define the destructuring, then define the type description afterwards.

```typescript
function logger({ p1, p2, p3 } : { p1: string, p2: string, p3: string }) {
  console.log(`${p1} - ${p2} - ${p3}`);
}

const param = {p1: 'a', p2: 'b', p3: 'c'};
logger(param);
```
Of course, it would be simpler and more common to define a named type for the object we're destructuring.

## Readonly
Properties can be marked as readonly to denote that we can read from them, but never write to them.
```typescript
interface Vehicle {
  make: string,
  model: string,
  year: number,
  readonly recalled: boolean,
}

function doWork(vehicle: Vehicle) {
  console.log(`vehicle recalled = ${vehicle.recalled}`); // Valid
  vehicle.recalled = false; // Invalid
}
```

Keep in mind that this functions like Javascript `const` where an object may not be reassignable, but its contents could be modified.

## Index Signatures
In Javascript we looked at how powerful it can be to dynamically assign the properties of an object with a string literal.  This is a bit more complicated in Typescript, but still doable.

In Typescript you don't need to know the names of the properties at compile time, but you do need to be able to describe their type.