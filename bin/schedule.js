const schedule = require('../index');
const validate = require('../index');
const parser = new(require('json2csv').Parser)();
const moment = require('moment');
const fs = require('fs');

if (process.argv[2] === 'export') {
    let result = schedule.getScheduleForYear(process.argv[3]);
    const csv = parser.parse(result);
    fs.writeFileSync('results.csv', csv);
} else if (process.argv[2] === 'validate') {
    schedule.validateRecurringStartDate(process.argv[3]);
} else if (process.argv[2] === 'sfr') {
    console.log(schedule.getScheduleForRecurringStartDate(process.argv[3]));
} else if (process.argv[2] === 'sfy') {
    console.log(JSON.stringify(schedule.getScheduleForYear(Number(process.argv[3])), null, 2));
} else {
    console.log('INVALID command, try node ./bin/schedule.js [ACTION]');
    console.log('         ACTIONS:');
    console.log('              export [year]: export the schedule for provided year');
    console.log('              validate [ISO date]: make sure the supplied ISO date is valid');
    console.log('              sfr [ISO date]: return a schedule for given ISO date');
    console.log('              sfy [year]: return a schedule for given year');
};