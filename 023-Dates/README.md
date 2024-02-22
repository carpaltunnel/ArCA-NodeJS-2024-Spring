# Dates
The Javascript `Date` object represents... you guessed it, dates.  Internally, Javascript stores dates in Unix epoch time - the number of milliseconds that have elapsed since January 01, 1970, 00:00:00 UTC.  Keep in mind that, like everything in Javascript, dates are zero indexed so January is month 0, February is 1, etc.

```javascript
const currentDateTime = new Date();
```

To initialize a new Date from a string or number, the following constructors are helpful : 
```javascript
new Date('May 10, 2021 18:01:02');
new Date('2021-05-10T18:01:02');
new Date(2021, 4, 17);
new Date(2021, 4, 17, 18, 01, 02);
new Date(1620582923000);
```

## Timezones
https://www.youtube.com/watch?v=-5wpm-gesOY
Before we talk about dates we should talk about timezones.  Timezones are inherently incoherent and will only make you sad.  I would strongly recommend that you never try to deal with timezones directly.  Simply use UTC for all internal dates, but even that is fraught with complexities when users become involved.


## Static Methods
1. Date.now() - Returns current time in epoch millisecond format
2. Date.parse() - Parses a string and returns epoch millisecond time (not recommended)
3. Date.UTC() - Similar to the Date() constructor, but in UTC
   
## Instance Methods
1. getDate() - Returns the day of the month
2. getDay() - Returns the day of the week (0 - 6)
3. getFullYear() - Returns four digit year (for four digit years)
4. getHours() - Returns the local time hour in 24 hour format
5. getMilliseconds() - Returns millisecond in local time (0 - 999)
6. getMinutes() - Returns minutes in local time (0 - 59)
7. getMonth() - Returns numeric month (0 - 11)
8. getSeconds() - Returns seconds (0 - 59)
9. getTime() - Returns number of milliseconds in epoch time.
10. getTimezoneOffset() - Returns locale timezone offset in minutes
11. getUTCDate, Day, FullYear, Hours, Milliseconds, Minutes, Month, Seconds - Same as above, but in UTC.
12. set... Date, FullYear, Hours, Milliseconds, Minutes, Month, Seconds, Time, UTC*, etc - Set the date property specified.
13. toDateString() - Returns the year/month/date in string format
14. toISOString() - Returns the date in ISO8601 format (best format)
15. toLocaleDateString() - Returns the year/month/date as a string in locale specific format
16. toLocaleString() - Returns the full date information as a string in locale specific format
17. toString() - Simple string
18. toTimeString() - Returns just the time portion as a string
19. toUTCString() - Returns the full date info as a string in UTC timezone.

## Date Comparisons
You can use the "greater than" and "less than" operators to compare dates accurately, but not "===".  Use "getTime()" to check equality by comparing millieconds.

## Date Manipulations
dateFns, Luxon

## Date Formats
There are many ways to format a date string, but only one correct way.  [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).  It sorts well on computers, it's an international standard, and it just plain makes sense.  All other date formats are obsolete and should be avoided due to their ambiguous and confusing nature.

After all, please identify the year, month, and day of the following formats :
1. 03-05-07
2. 07-03-05
3. 05-07-03
