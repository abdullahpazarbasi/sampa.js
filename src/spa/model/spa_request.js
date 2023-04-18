import {SPA_ALL, SPA_ZA_INC} from "../spa_service.js";
import {SampaError} from "../../common/sampa_error.js";

export class SpaRequest {
    year; // 4-digit year, valid range: -2000 to 6000, error code: 1
    month; // 2-digit month, valid range: 1 to  12,  error code: 2
    day; // 2-digit day, valid range: 1 to  31,  error code: 3
    hour; // Observer local hour, valid range: 0 to  24,  error code: 4
    minute; // Observer local minute, valid range: 0 to  59,  error code: 5
    second; // Observer local second, valid range: 0 to <60,  error code: 6
    delta_ut1; // Fractional second difference between UTC and UT which is used
    // to adjust UTC for earth's irregular rotation rate and is derived
    // from observation only and is reported in this bulletin:
    // http://maia.usno.navy.mil/ser7/ser7.dat,
    // where delta_ut1 = DUT1
    // valid range: -1 to 1 second (exclusive), error code 17
    delta_t; // Difference between earth rotation time and terrestrial time
    // It is derived from observation only and is reported in this
    // bulletin: http://maia.usno.navy.mil/ser7/ser7.dat,
    // where delta_t = 32.184 + (TAI-UTC) - DUT1
    // valid range: -8000 to 8000 seconds, error code: 7
    timezone; // Observer time zone (negative west of Greenwich)
    // valid range: -18   to   18 hours,   error code: 8
    longitude; // Observer longitude (negative west of Greenwich)
    // valid range: -180  to  180 degrees, error code: 9
    latitude; // Observer latitude (negative south of equator)
    // valid range: -90   to   90 degrees, error code: 10
    elevation; // Observer elevation [meters]
    // valid range: -6500000 or higher meters,    error code: 11
    pressure; // Annual average local pressure [millibars]
    // valid range:    0 to 5000 millibars,       error code: 12
    temperature; // Annual average local temperature [degrees Celsius]
    // valid range: -273 to 6000 degrees Celsius, error code; 13
    slope; // Surface slope (measured from the horizontal plane)
    // valid range: -360 to 360 degrees, error code: 14
    azm_rotation; // Surface azimuth rotation (measured from south to projection of surface normal on horizontal plane, negative east)
    // valid range: -360 to 360 degrees, error code: 15
    atmos_refract; // Atmospheric refraction at sunrise and sunset (0.5667 deg is typical)
    // valid range: -5   to   5 degrees, error code: 16
    function; // Switch to choose functions for desired output (from enumeration)

    constructor(
        year,
        month,
        day,
        hour,
        minute,
        second,
        delta_ut1,
        delta_t,
        timezone,
        longitude,
        latitude,
        elevation,
        pressure,
        temperature,
        slope,
        azm_rotation,
        atmos_refract,
        func
    ) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.delta_ut1 = delta_ut1;
        this.delta_t = delta_t;
        this.timezone = timezone;
        this.longitude = longitude;
        this.latitude = latitude;
        this.elevation = elevation;
        this.pressure = pressure;
        this.temperature = temperature;
        this.slope = slope;
        this.azm_rotation = azm_rotation;
        this.atmos_refract = atmos_refract;
        this.function = func;
    }

    assertValid() {
        if ((this.year < -2000) || (this.year > 6000)) {
            throw new SampaError(1, 'year must be an integer between -2000 and 6000');
        }
        if ((this.month < 1) || (this.month > 12)) {
            throw new SampaError(2, 'month must be an integer between 1 and 12');
        }
        if ((this.day < 1) || (this.day > 31)) {
            throw new SampaError(3, 'day must be an integer between 1 and 31');
        }
        if ((this.hour < 0) || (this.hour > 24)) {
            throw new SampaError(4, 'hour must be an integer between 0 and 24');
        }
        if ((this.minute < 0) || (this.minute > 59)) {
            throw new SampaError(5, 'minute must be an integer between 0 and 59');
        }
        if ((this.second < 0) || (this.second >= 60)) {
            throw new SampaError(6, 'second must be a number between 0 and 59.999999999');
        }
        if ((this.hour === 24) && (this.minute > 0)) {
            throw new SampaError(5, 'minute can not be greater than 0 while hour is 24');
        }
        if ((this.hour === 24) && (this.second > 0)) {
            throw new SampaError(6, 'second can not be greater than 0 while hour is 24');
        }
        if (Math.abs(this.delta_t) > 8000) {
            throw new SampaError(7, 'delta_t must be a number between -8000 and 8000');
        }
        if (Math.abs(this.timezone) > 18) {
            throw new SampaError(8, 'timezone must be a number between -18 and 18');
        }
        if (Math.abs(this.longitude) > 180) {
            throw new SampaError(9, 'longitude must be a number between -180 and 180');
        }
        if (Math.abs(this.latitude) > 90) {
            throw new SampaError(10, 'latitude must be a number between -90 and 90');
        }
        if (this.elevation < -6500000) {
            throw new SampaError(11, 'elevation can not be less than -6500000');
        }
        if ((this.pressure < 0) || (this.pressure > 5000)) {
            throw new SampaError(12, 'pressure must be a number between 0 and 5000');
        }
        if ((this.temperature <= -273) || (this.temperature > 6000)) {
            throw new SampaError(13, 'temperature must be a number between -272.999999999 and 6000');
        }

        if ((this.function === SPA_ZA_INC) || (this.function === SPA_ALL)) {
            if (Math.abs(this.slope) > 360) {
                throw new SampaError(14, 'slope must be a number between -360 and 360');
            }
            if (Math.abs(this.azm_rotation) > 360) {
                throw new SampaError(15, 'azm_rotation must be a number between -360 and 360');
            }
        }

        if (Math.abs(this.atmos_refract) > 5) {
            throw new SampaError(16, 'atmos_refract must be a number between -5 and 5');
        }
        if ((this.delta_ut1 <= -1) || (this.delta_ut1 >= 1)) {
            throw new SampaError(17, 'delta_ut1 must be a number which is greater than -1 and less than 1');
        }
    }
}