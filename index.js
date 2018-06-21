const moment = require('moment');

/**
 * Sort.
 *
 * @param {*} a a
 * @param {*} b b
 *
 * @return {Number} lt/gt
 */
let msort = (a, b) => {
    let aval = moment.utc(a.month, 'MMMM').format('M');
    let bval = moment.utc(b.month, 'MMMM').format('M');
    return aval - bval;
};

/**
 * Given a moment, generate a schedule given count and interval.
 *
 * @param {Moment} date A moment in time.
 * @param {number} count The number of dates to generate.
 * @param {number} interval The number of months to add for each interval.
 *
 * @return {Object} A schedule.
 */
let generateSchedule = (date, count = 1, interval) => {
    let results = [];
    for (let i = 0; i < count; i++) {
        let current = date.clone().add(i * interval, 'month');
        results.push({
            mmdd: current.format('MMDD'),
            month: current.format('MMMM'),
            day: current.date(),
        });
    }
    return results;
};

/**
 * Given a valid ISO date, generate a schedule.
 *
 * @param {String} date A valid ISO date.
 *
 * @return {Object} A schedule.
 */
let getSchedule = (date) => {
    if (!date.isValid()) {
        throw new Error('Invalid date.');
    }
    if (date.format('MMDD') === '0229') {
        date.subtract(1, 'day');
    }
    return {
        recurringStartDate: date.format('YYYY-MM-DD'),
        MONTHLY: generateSchedule(date.clone(), 12, 1).sort(msort),
        QUARTERLY: generateSchedule(date.clone(), 4, 3).sort(msort),
        YEARLY: generateSchedule(date.clone()).sort(msort),
    };
};

module.exports = getSchedule;
