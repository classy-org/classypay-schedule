# classypay-schedule
Classypay tools to translate, generate, and validate recurring dates and frequencies.

## Quickstart
```
git clone https://github.com/classy-org/classypay-schedule.git
cd classypay-schedule
yarn install
node ./bin/schedule.js
```
### Examples
Export a csv copy of a years schedule:
```
node ./bin/schedule.js export 2018
```
Validate an ISO date is valid and is on the schedule:
```
node ./bin/schedule.js validate 2018-10-12T00:00:00.00Z
```
Return the day of year for an ISO date:
```
node ./bin/schedule.js doy 2018-10-12T00:00:00.00Z
```
Return a date given a day of year:
```
node ./bin/schedule.js doy 65 2018
```
Return a schedule for a given day of year:
```
node ./bin/schedule.js sfd 65 2018
```
Return a schedule for a given date:
```
node ./bin/schedule.js sfr 2018-10-12T00:00:00.00Z
```
Return a schedule for a given year:
```
node ./bin/schedule.js sfy 2020
```
## Rules
### Timezone
All dates are calculated in UTC.
### Valid Days
A day is valid if and only if it falls between days 1-28 of the month or is the last day of the month.
### Storage
The frequency is stored as one of: MONTHLY, QUARTERLY, ANNUALLY.  The recurring day information is stored as a number between 1-365.
### Leap Year
For non leap years, there is no work to be done since all dates can be converted to/from day of year.  However for leap year, the following rule applies.  If a date provided by a client is greater (>) then day 59 of the year (Feb 28), a day is subtracted from the number to store the day of year as if the year is a non leap year.  This keeps the database consistent.

Conversion back from day of year during leap year works on the reverse principle, i.e. if the current year is a leap year AND the day of year is > 59 (Feb 28) then add one day to the day of year to convert back to leap year.  This ensures that dates are consistent.
## Use Case
### Classy
When a client calls classy with a frequency and a date, the <a href="#validateRecurringDate">validateRecurringDate(recurringDate)</a> should be called to validate the date provided is both a valid date format a valid date on the recurring schedule <a href="#getScheduleForYear">getScheduleForYear(year)</a>.

Once validated, the date should be immediately converted to storage format via <a href="#getDoy">getDoy(date)</a> which will convert to day of year and adjust for leap year.  The rest of the logic remains as-is for storage.

Upon retrieval of recurring, the day of year value should be converted back to a useable date for the client via <a href="#getDateFromDoy">getDateFromDoy(doy, year)</a>.  The client will always use a valid ISO date both for storage and for retrieval.  The day of year implementation will be hidden from a client perspective.

The recurring scheduler will use <a href="#getDoy">getDoy(date)</a> to retrieve the day of year for the server time in UTC and then call <a href="#getScheduleFromDoy">getScheduleFromDoy(doy, year)</a> to get the schedule of recurring days that should be retrieved from the database for recurring charges.

Finally, the sync functionality will need to use the same logic to convert day of year to the schedule to be stored by apiv2 and used by FRS, Engagement, and clients in their own workflows <a href="#getScheduleFromDoy">getScheduleFromDoy(doy, year)</a>.
## Functions

<dl>
<dt><a href="#lookupYear">lookupYear(date)</a></dt>
<dd><p>Lookup the schedule for the year.</p>
</dd>
<dt><a href="#msort">msort()</a></dt>
<dd><p>Sort by logical calendar month.</p>
</dd>
<dt><a href="#getDoy">getDoy(date)</a></dt>
<dd><p>Get the day of year for the given date and adjust for leap year.</p>
</dd>
<dt><a href="#getDateFromDoy">getDateFromDoy(doy, year)</a></dt>
<dd><p>Given a day of the year, return a date.  Year is optional, defaults to current year.</p>
</dd>
<dt><a href="#getScheduleFromDoy">getScheduleFromDoy(doy, year)</a></dt>
<dd><p>Given a day of year, return the schedule for recurring.</p>
</dd>
<dt><a href="#getScheduleFromRecurringDate">getScheduleFromRecurringDate(recurringDate)</a></dt>
<dd><p>Given a recurring date, return a schedule for recurring.</p>
</dd>
<dt><a href="#getSchedule">getSchedule(date, count, interval)</a></dt>
<dd><p>Given a date, generate a schedule.</p>
</dd>
<dt><a href="#getScheduleForYear">getScheduleForYear(year)</a></dt>
<dd><p>Generate the entire recurring schedule for a year.</p>
</dd>
<dt><a href="#validateRecurringDate">validateRecurringDate(recurringDate)</a></dt>
<dd><p>Given an ISO formatted date string, determine if the given date is valid for the yearly schedule.</p>
</dd>
</dl>

<a name="lookupYear"></a>

## lookupYear(date)
Lookup the schedule for the year.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Moment</code> | A moment in time. |

<a name="msort"></a>

## msort()
Sort by logical calendar month.

**Kind**: global function  
<a name="getDoy"></a>

## getDoy(date)
Get the day of year for the given date and adjust for leap year.

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Moment</code> | 

<a name="getDateFromDoy"></a>

## getDateFromDoy(doy, year)
Given a day of the year, return a date.  Year is optional, defaults to current year.

**Kind**: global function  

| Param | Type |
| --- | --- |
| doy | <code>number</code> | 
| year | <code>number</code> | 

<a name="getScheduleFromDoy"></a>

## getScheduleFromDoy(doy, year)
Given a day of year, return the schedule for recurring.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| doy | <code>number</code> | The day of the year 1-365. |
| year | <code>number</code> |  |

<a name="getScheduleFromRecurringDate"></a>

## getScheduleFromRecurringDate(recurringDate)
Given a recurring date, return a schedule for recurring.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| recurringDate | <code>string</code> | An ISO formatted date string. |

<a name="getSchedule"></a>

## getSchedule(date, count, interval)
Given a date, generate a schedule.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Moment</code> |  | A moment in time. |
| count | <code>number</code> | <code>1</code> | The number of dates to generate. |
| interval | <code>number</code> |  | The number of months to add for each interval. |

<a name="getScheduleForYear"></a>

## getScheduleForYear(year)
Generate the entire recurring schedule for a year.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| year | <code>number</code> | The year. |

<a name="validateRecurringDate"></a>

## validateRecurringDate(recurringDate)
Given an ISO formatted date string, determine if the given date is valid for the yearly schedule.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| recurringDate | <code>string</code> | An ISO formatted date string. |

