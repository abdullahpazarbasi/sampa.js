export const SUN_RADIUS = 0.26667;

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
    limited = 360.0 * (limited - integer(limited));
    if (limited < 0) {
        limited += 360.0;
    }

    return limited;
}

export function limit_degrees180pm(degrees) {
    let limited = degrees / 360.0;
    limited = 360.0 * (limited - integer(limited));
    if (limited < -180.0) {
        limited += 360.0;
    } else if (limited > 180.0) {
        limited -= 360.0;
    }

    return limited;
}

export function limit_degrees180(degrees) {
    let limited = degrees / 180.0;
    limited = 180.0 * (limited - integer(limited));
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
    let limited = value - integer(value);
    if (limited < 0) {
        limited += 1.0;
    }

    return limited;
}

export function third_order_polynomial(a, b, c, d, x) {
    return ((a * x + b) * x + c) * x + d;
}

export function fourth_order_polynomial(a, b, c, d, e, x) {
    return (((a * x + b) * x + c) * x + d) * x + e;
}

export function geocentric_right_ascension(lamda, epsilon, beta) {
    const lamda_rad = deg2rad(lamda);
    const epsilon_rad = deg2rad(epsilon);

    return limit_degrees(rad2deg(Math.atan2(Math.sin(lamda_rad) * Math.cos(epsilon_rad) - Math.tan(deg2rad(beta)) * Math.sin(epsilon_rad), Math.cos(lamda_rad))));
}

export function geocentric_declination(beta, epsilon, lamda) {
    const beta_rad = deg2rad(beta);
    const epsilon_rad = deg2rad(epsilon);

    return rad2deg(Math.asin(Math.sin(beta_rad) * Math.cos(epsilon_rad) + Math.cos(beta_rad) * Math.sin(epsilon_rad) * Math.sin(deg2rad(lamda))));
}

export function observer_hour_angle(nu, longitude, alpha_deg) {
    return limit_degrees(nu + longitude - alpha_deg);
}

export function right_ascension_parallax_and_topocentric_dec(latitude, elevation, xi, h, delta) {
    const lat_rad = deg2rad(latitude);
    const xi_rad = deg2rad(xi);
    const h_rad = deg2rad(h);
    const delta_rad = deg2rad(delta);
    const u = Math.atan(0.99664719 * Math.tan(lat_rad));
    const y = 0.99664719 * Math.sin(u) + elevation * Math.sin(lat_rad) / 6378140.0;
    const x = Math.cos(u) + elevation * Math.cos(lat_rad) / 6378140.0;

    const delta_alpha_rad = Math.atan2(-x * Math.sin(xi_rad) * Math.sin(h_rad), Math.cos(delta_rad) - x * Math.sin(xi_rad) * Math.cos(h_rad));

    const delta_alpha = rad2deg(delta_alpha_rad);
    const delta_prime = rad2deg(Math.atan2((Math.sin(delta_rad) - y * Math.sin(xi_rad)) * Math.cos(delta_alpha_rad), Math.cos(delta_rad) - x * Math.sin(xi_rad) * Math.cos(h_rad)));

    return {delta_alpha: delta_alpha, delta_prime: delta_prime};
}

export function topocentric_right_ascension(alpha_deg, delta_alpha) {
    return alpha_deg + delta_alpha;
}

export function topocentric_local_hour_angle(h, delta_alpha) {
    return h - delta_alpha;
}

export function topocentric_elevation_angle(latitude, delta_prime, h_prime) {
    const lat_rad = deg2rad(latitude);
    const delta_prime_rad = deg2rad(delta_prime);

    return rad2deg(Math.asin(Math.sin(lat_rad) * Math.sin(delta_prime_rad) + Math.cos(lat_rad) * Math.cos(delta_prime_rad) * Math.cos(deg2rad(h_prime))));
}

export function atmospheric_refraction_correction(pressure, temperature, atmos_refract, e0) {
    let del_e = 0;
    if (e0 >= -1 * (SUN_RADIUS + atmos_refract)) {
        del_e = (pressure / 1010.0) * (283.0 / (273.0 + temperature)) * 1.02 / (60.0 * Math.tan(deg2rad(e0 + 10.3 / (e0 + 5.11))));
    }

    return del_e;
}

export function topocentric_elevation_angle_corrected(e0, delta_e) {
    return e0 + delta_e;
}

export function topocentric_zenith_angle(e) {
    return 90.0 - e;
}

export function topocentric_azimuth_angle_astro(h_prime, latitude, delta_prime) {
    const h_prime_rad = deg2rad(h_prime);
    const lat_rad = deg2rad(latitude);

    return limit_degrees(rad2deg(Math.atan2(Math.sin(h_prime_rad), Math.cos(h_prime_rad) * Math.sin(lat_rad) - Math.tan(deg2rad(delta_prime)) * Math.cos(lat_rad))));
}

export function topocentric_azimuth_angle(azimuth_astro) {
    return limit_degrees(azimuth_astro + 180.0);
}
