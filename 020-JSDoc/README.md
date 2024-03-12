# JSDoc
With [JSDoc](https://jsdoc.app) we can write easy to understand and effectively self documenting code.  Comments are added to each function so it's easy to read while working in the code, but it can also generate user facing documentation.

## Format
JSDoc blocks use a special version of the block comment syntax.  Instead of `/*`, they are defined by `/**`.
```javascript
/**
 * I am a JSDoc block
*/ 
```

You'll want to add a JSDoc to every function you define.  Usually it's best to write your function definition and JSDoc first, then implement the logic.  It forces you to not forget to do it... though the linter will do that too.

JSDoc tags are indicated by the `@` symbol.  Tags are how we instruct JSDoc to do special things besides simply display our string description.

The most common format you'll see is :
```javascript
/**
 * Return the sum of two numbers
 * @param {number} x - First operand for the sum
 * @param {number} y - Second operand for the sum
 * @returns {number} The sum of the two parameters
*/
function sum(x, y) {
  return x + y;
}
```

In this example you have the following JSDoc components : 
1. Description : `Return the sum of two numbers`
2. @param tag with type, name, and description : `@param {number} x - First operand for the sum`
3. @returns tag with type, name, and description : `@returns {number} - The sum of the two parameters`


## Other Common Tags
1. @async - Indicates an asynchronous function.  When using async/await this shouldn't be needed.
2. @class - Marks a function as being a constructor, meant to be called with the new keyword to return an instance.
3. @constant - Indicates a constant value
4. @default - Usually used with @constant to include the value in the documentation
5. @deprecated - Marks code as being deprecated
6. @description - Usually not needed because the first line of the comment is used by default.
7. @event / @fires / @listens - Documents EventEmitter and listener code.
8. @exports - Generally not needed if using `module.exports`
9. @extends (@augments) - Indicates the extension of (usually) another class.
10. @link - Link to something else, internal or external
11. @module - Marks the file as being its own module
12. @override - Indicates that a property overrides a parent property.  Usually not needed/inferred by JSDoc
13. @property - Documents the type, name, and description of static properties
14. @readonly
15. @requires - Indicates that a separate module is required
16. @see - Refer to other documentation (typically used with @link)
17. @since - Indicates when the feature was added
18. @static
19. @summary - A brief of the full description if needed
20. @this - For when `this` gets confusing
21. @throws - Documents errors that can be thrown (AKA @exception)
22. @todo
23. @type

## Generate Documentation
You can install JSDoc locally or globally.  Generally it's recommended to install globally for ease of use but I personally prefer to keep things local when possible.

Global usage : `jsdoc <file>`
Local usage : `node ./node_modules/jsdoc/jsdoc.js <file>`

## Closing
Whether or not you decide to generate documentation with JSDoc you should always document your code and this is a good, consistent, method of doing so.