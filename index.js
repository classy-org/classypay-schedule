const moment = require('moment');

let msort = (a, b) => {
    let aval = moment(a.month, 'MMMM').format('M');
    let bval = moment(b.month, 'MMMM').format('M');
    return aval - bval;
};

let doy = (date) => {
    return date.isLeapYear() && date.dayOfYear() > 59 ? date.dayOfYear() - 1 : date.dayOfYear();
}

let dateFromDoy = (doy, year = moment().utc(false).format('YYYY')) => {
    let myr = moment(year, 'YYYY').utc(false).startOf('day');
    return (myr.isLeapYear() && doy > 59) ? myr.dayOfYear(doy + 1).format() : myr.dayOfYear(doy).format();
}

let schedule = (date, count = 1, interval) => {
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

let year = (year) => {
    let days = []
    // always use UTC, set to requested year, and reset to start of year
    let current = moment().utc(false).year(year).startOf('year');
    // 365 normally but 366 if leap year
    for (let day = 1; day <= (current.isLeapYear() ? 366 : 365); day++) {
        // offset by 1 if leap year and day of year is after 59 (Feb 28)
        current.dayOfYear(current.isLeapYear() && current.dayOfYear > 59 ? day + 1 : day);
        // check if date is end of a month
        let eom = current.date() === current.clone().endOf('month').date();
        // we will only schedule for days 1-28 or end of month, we will also skip day 60 of a leap year
        if ((current.date() <= 28 || eom) && (!current.isLeapYear() || current.dayOfYear() !== 60)) {
            days.push({
                date: current.format(),
                doy: doy(current),
                dateFromDoy: dateFromDoy(doy(current), current.year()),
                monthly: schedule(current.clone(), 12, 1).sort(msort),
                quarterly: schedule(current.clone(), 4, 3).sort(msort),
                annual:  schedule(current.clone()).sort(msort)
            });
        }
        // keep adding a day unless we hit EOY
        if (doy(current) < 365) {
            current.add(1, 'day');
        }
    }
    return days;
}

module.exports = {
    doy,
    dayFromDoy,
    schedule,
    year
};