const schedule = require('../index');
const moment = require('moment');

if (process.argv[2] === 'schedule') {
    console.log(JSON.stringify(schedule(moment(process.argv[3])), null, 2));
} else {
    console.log('INVALID command, try node ./bin/schedule.js [ACTION]');
    console.log(' ACTIONS:');
    console.log('   schedule [ISO date]: return a schedule for given ISO date');
};
