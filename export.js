const getSchedule = require ('./index');
const fs = require('fs');

let result = getSchedule(process.argv[2]);
fs.writeFileSync('results.json', JSON.stringify(result, null, 2));
