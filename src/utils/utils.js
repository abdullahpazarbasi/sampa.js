// Human readability functions

export function convertFractionalHourToClockNotation(fractionalHour) {
    const exactHours = Math.trunc(fractionalHour);
    const minutes = 60 * (fractionalHour - exactHours);
    const exactMinutes = Math.trunc(minutes);
    const seconds = 60 * (minutes - exactMinutes);
    const exactSeconds = Math.trunc(seconds);
    const formattedHours = exactHours.toString().padStart(2, '0');
    const formattedMinutes = exactMinutes.toString().padStart(2, '0');
    const formattedSeconds = exactSeconds.toString().padStart(2, '0');


    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Julian functions

export function julian_day(year, month, day, hour, minute, second, dut1, tz) {
    let day_decimal, julian_day, a;

    day_decimal = day + (hour - tz + (minute + (second + dut1) / 60.0) / 60.0) / 24.0;

    if (month < 3) {
        month += 12;
        year--;
    }

    julian_day = integer(365.25 * (year + 4716.0)) + integer(30.6001 * (month + 1)) + day_decimal - 1524.5;

    if (julian_day > 2299160.0) {
        a = integer(year / 100);
        julian_day += (2 - a + integer(a / 4));
    }

    return julian_day;
}

export function julian_century(jd) {
    return (jd - 2451545.0) / 36525.0;
}

export function julian_ephemeris_day(jd, delta_t) {
    return jd + delta_t / 86400.0;
}

export function julian_ephemeris_century(jde) {
    return (jde - 2451545.0) / 36525.0;
}

export function julian_ephemeris_millennium(jce) {
    return (jce / 10.0);
}

// Other functions

export function rad2deg(radians) {
    return (180.0 / Math.PI) * radians;
}

export function deg2rad(degrees) {
    return (Math.PI / 180.0) * degrees;
}

export function integer(value) {
    return Math.trunc(value);
}

export function limit_degrees(degrees) {
    let limited = degrees / 360.0;
    limited = 360.0 * (limited - Math.floor(limited));
    if (limited < 0) {
        limited += 360.0;
    }

    return limited;
}

export function limit_degrees180pm(degrees) {
    let limited = degrees / 360.0;
    limited = 360.0 * (limited - Math.floor(limited));
    if (limited < -180.0) {
        limited += 360.0;
    } else if (limited > 180.0) {
        limited -= 360.0;
    }

    return limited;
}

export function limit_degrees180(degrees) {
    let limited = degrees / 180.0;
    limited = 180.0 * (limited - Math.floor(limited));
    if (limited < 0) {
        limited += 180.0;
    }

    return limited;
}

export function limit_minutes(minutes) {
    let limited = minutes;
    if (limited < -20.0) {
        limited += 1440.0;
    } else if (limited > 20.0) {
        limited -= 1440.0;
    }

    return limited;
}

export function dayfrac_to_local_hr(dayfrac, timezone) {
    return 24.0 * limit_zero2one(dayfrac + timezone / 24.0);
}

export function limit_zero2one(value) {
    let limited = value - Math.floor(value);
    if (limited < 0) {
        limited += 1.0;
    }

    return limited;
}

export function third_order_polynomial(a, b, c, d, x) {
    return ((a * x + b) * x + c) * x + d;
}
