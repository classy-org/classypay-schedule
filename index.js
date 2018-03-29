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
            map[obj.recurringStartDate] = obj;
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
 * Given a recurring start date, return a schedule for recurring.
 * 
 * @param {string} recurringStartDate An ISO formatted date string.
 */
let getScheduleForRecurringStartDate = (recurringStartDate) => {
    let date = moment.utc(recurringStartDate, moment.ISO_8601, true);
    let scheduleForYear = lookupYear(date.format('YYYY'));
    return scheduleForYear[date.format('YYYY-MM-DD')];
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

let getDay = (date, year) => {
    return {
        recurringStartDate: date.format('YYYY-MM-DD'),
        MONTHLY: getSchedule(date.clone(), 12, 1).sort(msort),
        QUARTERLY: getSchedule(date.clone(), 4, 3).sort(msort),
        YEARLY: getSchedule(date.clone()).sort(msort)
    }
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
            days.push(getDay(current, year));
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
 * @param {string} recurringStartDate An ISO formatted date string.
 */
let validateRecurringStartDate = (recurringStartDate) => {
    let date = moment.utc(recurringStartDate, 'YYYY-MM-DD', true);
    if (date.isValid()) {
        let year = lookupYear(date.format('YYYY'));
        if (!year[date.format('YYYY-MM-DD')]) {
            throw new Error(`${date} is not a valid recurring start date`);
        }
    } else {
        throw new Error(`${recurringStartDate} is not a valid date`);
    }
}

module.exports = {
    getScheduleForRecurringStartDate,
    getScheduleForYear,
    validateRecurringStartDate
};