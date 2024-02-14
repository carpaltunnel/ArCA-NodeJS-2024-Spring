const commander = require('commander');
const program = new commander.Command();

program
    .requiredOption('-d, --database <db>', 'Database to connect to')
    .requiredOption('-u, --username <un>', 'Username to connect with')
    .requiredOption('-p, --password <pw>', 'Password for username')
    .option('-n, --numberOfConnections <num>', 'Number of concurrent connections', 5);

program.parse();

console.log(`Database param is ${program.opts().database}, user is ${program.opts().username}, pw is ${program.opts().password}, and number of connections is ${program.opts().numberOfConnections}`);