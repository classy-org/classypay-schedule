const year = require ('../index').year;
const validate = require('../index').validate;
const parser = new (require('json2csv').Parser)();
const fs = require('fs');

if (process.argv[2] === 'export') {
    let result = year(process.argv[3]);
    const csv = parser.parse(result);
    fs.writeFileSync('results.csv', csv);
}

if(process.argv[2] === 'validate') {
    validate(process.argv[3]);
}
