const moment = require('moment');
let years = [];

/**
 * Lookup the schedule for the year.
 * 
 * @param {Moment} date A moment in time.
 */
let lookupYear = (year = moment.utc().format('YYYY')) => {
    if (!years[year]) {
        years[year] = getScheduleForYear(year).reduce(function (map, obj) {
            map[obj.doy] = obj;
            return map;
        }, {});
    }
    return years[year];
}

/** 
 * Sort by logical calendar month.
 */
let msort = (a, b) => {
    let aval = moment.utc(a.month, 'MMMM').format('M');
    let bval = moment.utc(b.month, 'MMMM').format('M');
    return aval - bval;
};

/**
 * Get the day of year for the given date and adjust for leap year.
 * 
 * @param {Moment} date 
 */
let getDoy = (date) => {
    return date.isLeapYear() && date.dayOfYear() > 59 ? date.dayOfYear() - 1 : date.dayOfYear();
}

/**
 * Given a day of the year, return a date.  Year is optional, defaults to current year.
 * 
 * @param {number} doy 
 * @param {number} year 
 */
let getDateFromDoy = (doy, year = moment.utc().format('YYYY')) => {;
    let date = moment.utc(year, 'YYYY').startOf('year');
    return (date.isLeapYear() && doy > 59) ? date.dayOfYear(doy + 1).format() : date.dayOfYear(doy).format();
}

/**
 * Given a day of year, return the schedule for recurring.
 * 
 * @param {number} doy The day of the year 1-365.
 * @param {number} year 
 */
let getScheduleFromDoy = (doy, year = moment.utc().format('YYYY')) => {
    let scheduleForYear = lookupYear(year);
    return scheduleForYear[doy];
}

/**
 * Given a recurring date, return a schedule for recurring.
 * 
 * @param {string} recurringDate An ISO formatted date string.
 */
let getScheduleFromRecurringDate = (recurringDate) => {
    let date = moment.utc(recurringDate);
    return getScheduleFromDoy(getDoy(date), date.year());
}

/**
 * Given a date, generate a schedule.
 * 
 * @param {Moment} date A moment in time.
 * @param {number} count The number of dates to generate.
 * @param {number} interval The number of months to add for each interval.
 */
let getSchedule = (date, count = 1, interval) => {
    let results = [];
    let eom = date.date() === date.clone().endOf('month').date();
    for (let i = 1; i <= count; i++) {
        let day = eom ? date.clone().endOf('month').date() : date.date();
        results.push({
            month: date.format('MMMM'),
            day: day === 29 ? 28 : day
        });
        if (count && interval) {
            date.add(interval, 'month');
        }
    }
    return results;
}

/**
 * Generate the entire recurring schedule for a year.
 * 
 * @param {number} year The year.
 */
let getScheduleForYear = (year = moment.utc().format('YYYY')) => {
    let days = []
    // always use UTC, set to requested year, and reset to start of year
    let current = moment.utc().year(year).startOf('year');
    // 365 normally but 366 if leap year
    for (let day = 1; day <= (current.isLeapYear() ? 366 : 365); day++) {
        current.dayOfYear(day);
        // check if date is end of a month
        let eom = current.date() === current.clone().endOf('month').date();
        // we will only schedule for days 1-28 or end of month, we will also skip day 60 of a leap year
        if ((current.date() <= 28 || eom) && (!current.isLeapYear() || current.dayOfYear() !== 60)) {
            days.push({
                date: current.format(),
                doy: getDoy(current),
                dateFromDoy: getDateFromDoy(getDoy(current), year),
                monthly: getSchedule(current.clone(), 12, 1).sort(msort),
                quarterly: getSchedule(current.clone(), 4, 3).sort(msort),
                annual: getSchedule(current.clone()).sort(msort)
            });
        }
        // keep adding a day unless we hit EOY
        if (getDoy(current) < 365) {
            current.add(1, 'day');
        }
    }
    return days;
}

/**
 * Given an ISO formatted date string, determine if the given date is valid for the yearly schedule.
 * 
 * @param {string} recurringDate An ISO formatted date string.
 */
let validateRecurringDate = (recurringDate) => {
    let date = moment.utc(recurringDate);
    if (date.isValid()) {
        let year = lookupYear(date.format('YYYY'));
        let doy = getDoy(date);
        if (!year[doy]) {
            throw new Error(`${date} is not a valid recurring date`);
        }
    } else {
        throw new Error(`${recurringDate} is not a valid date`);
    }
}

module.exports = {
    getDoy,
    getDateFromDoy,
    getScheduleFromDoy,
    getScheduleFromRecurringDate,
    getScheduleForYear,
    validateRecurringDate
};