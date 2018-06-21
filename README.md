# classypay-schedule
Classy Pay library to generate a schedule for a recurring start date.

## Quickstart
```
git clone https://github.com/classy-org/classypay-schedule.git
cd classypay-schedule
yarn install
node ./bin/schedule.js
```
### Examples
Get the schedule for a given recurring start date:
```
node ./bin/schedule.js schedule 2018-06-21
```
## Rules
### Timezone
All dates are calculated in UTC.
### Storage
The frequency is stored as one of: MONTHLY, QUARTERLY, YEARLY.  The recurring start date is stored as an ISO date without time: YYYY-MM-DD.
### Leap Year
February 29th will be converted to February 28th during leap years.
## Use Case
### Classy
## Functions
<dl>
<dt><a href="#msort">msort(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Sort.</p>
</dd>
<dt><a href="#generateSchedule">generateSchedule(date, count, interval)</a> ⇒ <code>Object</code></dt>
<dd><p>Given a moment, generate a schedule given count and interval.</p>
</dd>
<dt><a href="#getSchedule">getSchedule(date)</a> ⇒ <code>Object</code></dt>
<dd><p>Given a valid ISO date, generate a schedule.</p>
</dd>
</dl>

<a name="msort"></a>

## msort(a, b) ⇒ <code>Number</code>
Sort.

**Kind**: global function  
**Returns**: <code>Number</code> - lt/gt  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>\*</code> | a |
| b | <code>\*</code> | b |

<a name="generateSchedule"></a>

## generateSchedule(date, count, interval) ⇒ <code>Object</code>
Given a moment, generate a schedule given count and interval.

**Kind**: global function  
**Returns**: <code>Object</code> - A schedule.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Moment</code> |  | A moment in time. |
| count | <code>number</code> | <code>1</code> | The number of dates to generate. |
| interval | <code>number</code> |  | The number of months to add for each interval. |

<a name="getSchedule"></a>

## getSchedule(date) ⇒ <code>Object</code>
Given a valid ISO date, generate a schedule.

**Kind**: global function  
**Returns**: <code>Object</code> - A schedule.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | A valid ISO date. |