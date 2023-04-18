import {SPA_ALL, SPA_ZA_INC} from "../spa_service.js";

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

    validate() {
        if ((this.year < -2000) || (this.year > 6000)) return 1;
        if ((this.month < 1) || (this.month > 12)) return 2;
        if ((this.day < 1) || (this.day > 31)) return 3;
        if ((this.hour < 0) || (this.hour > 24)) return 4;
        if ((this.minute < 0) || (this.minute > 59)) return 5;
        if ((this.second < 0) || (this.second >= 60)) return 6;
        if ((this.hour === 24) && (this.minute > 0)) return 5;
        if ((this.hour === 24) && (this.second > 0)) return 6;
        if (Math.abs(this.delta_t) > 8000) return 7;
        if (Math.abs(this.timezone) > 18) return 8;
        if (Math.abs(this.longitude) > 180) return 9;
        if (Math.abs(this.latitude) > 90) return 10;
        if (this.elevation < -6500000) return 11;
        if ((this.pressure < 0) || (this.pressure > 5000)) return 12;
        if ((this.temperature <= -273) || (this.temperature > 6000)) return 13;

        if ((this.function === SPA_ZA_INC) || (this.function === SPA_ALL)) {
            if (Math.abs(this.slope) > 360) return 14;
            if (Math.abs(this.azm_rotation) > 360) return 15;
        }

        if (Math.abs(this.atmos_refract) > 5) return 16;
        if ((this.delta_ut1 <= -1) || (this.delta_ut1 >= 1)) return 17;

        return 0;
    }
}