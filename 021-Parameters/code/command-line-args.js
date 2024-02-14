const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'database', alias: 'd', type: String },
    { name: 'username', alias: 'u', type: String },
    { name: 'password', alias: 'p', type: String },
    { name: 'numberOfConnections', alias: 'n', type: Number, defaultOption: 5 },
];
const params = commandLineArgs(optionDefinitions);
console.log(`Database param is ${params.database}, user is ${params.username}, pw is ${params.password}, and number of connections is ${params.numberOfConnections}`);