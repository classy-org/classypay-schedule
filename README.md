# classypay-schedule
Classypay tools to translate, generate, and validate recurring dates and frequencies.
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

