/**
 * Sum description here
 * @summary this is the summary
 * @param {number} x - Operand one
 * @param {number} y -  Operand two
 * @returns {number} the sum
 */
const sum = (x, y) => {
    return (x + y);
}

/**
 * Subtract description here
 * @summary this is the summary
 * @todo rework this
 * @param {number} x - Operand one
 * @param {number} y -  Operand two
 * @returns {number} the difference
 */
const subtract = (x, y) => {
    return (x - y);
}


/**
 * @constant
 * @default 'this is the default'
 */
const car = {
    make: 'Honda',
    model: 'Accord',
    color: 'Red',
}

const paintVehicle = (car, color) => {
    return color;
}

console.log(`Current color is : ${car.color}`);

/**
 * @see @link paintVehicle
 */
car.color = paintVehicle(car, 'Blue');
console.log(`New color is : ${car.color}`);