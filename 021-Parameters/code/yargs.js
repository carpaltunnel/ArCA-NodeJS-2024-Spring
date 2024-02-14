const yargs = require('yargs')(process.argv.slice(2))
    .scriptName('yargs')
    .usage('Usage: $0 --database db --username un --password pw --numberOfConnections num')
    .example('$0 --database localhost --username myuser --password superSecret --numberOfConnections 5')
    .option('d', {
        alias: 'database',
        describe: 'Database to connect to',
        demandOption: '--database is required',
        type: 'string'
    })
    .option('u', {
        alias: 'username',
        describe: 'Username to connect with',
        demandOption: '--username is required',
        type: 'string'
    })
    .option('p', {
        alias: 'password',
        describe: 'Password for username',
        demandOption: '--password is required',
        type: 'string'
    })
    .option('n', {
        alias: 'numberOfConnections',
        describe: 'Number of concurrent connections',
        default: 5,
        type: 'number'
    })
    .showHelpOnFail();

const { database, username, password, numberOfConnections } = yargs.argv;
console.log(`Database param is ${database}, user is ${username}, pw is ${password}, and number of connections is ${numberOfConnections}`);