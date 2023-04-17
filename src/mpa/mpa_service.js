import {MpaInput} from "./model/mpa_input.js";
import {MpaOutput} from "./model/mpa_output.js";
import {
    atmospheric_refraction_correction,
    deg2rad,
    fourth_order_polynomial,
    geocentric_declination,
    geocentric_right_ascension,
    limit_degrees,
    observer_hour_angle,
    rad2deg,
    right_ascension_parallax_and_topocentric_dec,
    third_order_polynomial,
    topocentric_azimuth_angle,
    topocentric_azimuth_angle_astro,
    topocentric_elevation_angle,
    topocentric_elevation_angle_corrected,
    topocentric_local_hour_angle,
    topocentric_right_ascension,
    topocentric_zenith_angle
} from "../utils/utils.js";

const TERM_D = 0;
const TERM_M = 1;
const TERM_MPR = 2;
const TERM_F = 3;
const TERM_LB = 4;
const TERM_R = 5;

// Moon's Periodic Terms for Longitude and Distance
const ML_TERMS = [
    [0, 0, 1, 0, 6288774, -20905355],
    [2, 0, -1, 0, 1274027, -3699111],
    [2, 0, 0, 0, 658314, -2955968],
    [0, 0, 2, 0, 213618, -569925],
    [0, 1, 0, 0, -185116, 48888],
    [0, 0, 0, 2, -114332, -3149],
    [2, 0, -2, 0, 58793, 246158],
    [2, -1, -1, 0, 57066, -152138],
    [2, 0, 1, 0, 53322, -170733],
    [2, -1, 0, 0, 45758, -204586],
    [0, 1, -1, 0, -40923, -129620],
    [1, 0, 0, 0, -34720, 108743],
    [0, 1, 1, 0, -30383, 104755],
    [2, 0, 0, -2, 15327, 10321],
    [0, 0, 1, 2, -12528, 0],
    [0, 0, 1, -2, 10980, 79661],
    [4, 0, -1, 0, 10675, -34782],
    [0, 0, 3, 0, 10034, -23210],
    [4, 0, -2, 0, 8548, -21636],
    [2, 1, -1, 0, -7888, 24208],
    [2, 1, 0, 0, -6766, 30824],
    [1, 0, -1, 0, -5163, -8379],
    [1, 1, 0, 0, 4987, -16675],
    [2, -1, 1, 0, 4036, -12831],
    [2, 0, 2, 0, 3994, -10445],
    [4, 0, 0, 0, 3861, -11650],
    [2, 0, -3, 0, 3665, 14403],
    [0, 1, -2, 0, -2689, -7003],
    [2, 0, -1, 2, -2602, 0],
    [2, -1, -2, 0, 2390, 10056],
    [1, 0, 1, 0, -2348, 6322],
    [2, -2, 0, 0, 2236, -9884],
    [0, 1, 2, 0, -2120, 5751],
    [0, 2, 0, 0, -2069, 0],
    [2, -2, -1, 0, 2048, -4950],
    [2, 0, 1, -2, -1773, 4130],
    [2, 0, 0, 2, -1595, 0],
    [4, -1, -1, 0, 1215, -3958],
    [0, 0, 2, 2, -1110, 0],
    [3, 0, -1, 0, -892, 3258],
    [2, 1, 1, 0, -810, 2616],
    [4, -1, -2, 0, 759, -1897],
    [0, 2, -1, 0, -713, -2117],
    [2, 2, -1, 0, -700, 2354],
    [2, 1, -2, 0, 691, 0],
    [2, -1, 0, -2, 596, 0],
    [4, 0, 1, 0, 549, -1423],
    [0, 0, 4, 0, 537, -1117],
    [4, -1, 0, 0, 520, -1571],
    [1, 0, -2, 0, -487, -1739],
    [2, 1, 0, -2, -399, 0],
    [0, 0, 2, -2, -381, -4421],
    [1, 1, 1, 0, 351, 0],
    [3, 0, -2, 0, -340, 0],
    [4, 0, -3, 0, 330, 0],
    [2, -1, 2, 0, 327, 0],
    [0, 2, 1, 0, -323, 1165],
    [1, 1, -1, 0, 299, 0],
    [2, 0, 3, 0, 294, 0],
    [2, 0, -1, -2, 0, 8752]
];

// Moon's Periodic Terms for Latitude
const MB_TERMS = [
    [0, 0, 0, 1, 5128122, 0],
    [0, 0, 1, 1, 280602, 0],
    [0, 0, 1, -1, 277693, 0],
    [2, 0, 0, -1, 173237, 0],
    [2, 0, -1, 1, 55413, 0],
    [2, 0, -1, -1, 46271, 0],
    [2, 0, 0, 1, 32573, 0],
    [0, 0, 2, 1, 17198, 0],
    [2, 0, 1, -1, 9266, 0],
    [0, 0, 2, -1, 8822, 0],
    [2, -1, 0, -1, 8216, 0],
    [2, 0, -2, -1, 4324, 0],
    [2, 0, 1, 1, 4200, 0],
    [2, 1, 0, -1, -3359, 0],
    [2, -1, -1, 1, 2463, 0],
    [2, -1, 0, 1, 2211, 0],
    [2, -1, -1, -1, 2065, 0],
    [0, 1, -1, -1, -1870, 0],
    [4, 0, -1, -1, 1828, 0],
    [0, 1, 0, 1, -1794, 0],
    [0, 0, 0, 3, -1749, 0],
    [0, 1, -1, 1, -1565, 0],
    [1, 0, 0, 1, -1491, 0],
    [0, 1, 1, 1, -1475, 0],
    [0, 1, 1, -1, -1410, 0],
    [0, 1, 0, -1, -1344, 0],
    [1, 0, 0, -1, -1335, 0],
    [0, 0, 3, 1, 1107, 0],
    [4, 0, 0, -1, 1021, 0],
    [4, 0, -1, 1, 833, 0],
    [0, 0, 1, -3, 777, 0],
    [4, 0, -2, 1, 671, 0],
    [2, 0, 0, -3, 607, 0],
    [2, 0, 2, -1, 596, 0],
    [2, -1, 1, -1, 491, 0],
    [2, 0, -2, 1, -451, 0],
    [0, 0, 3, -1, 439, 0],
    [2, 0, 2, 1, 422, 0],
    [2, 0, -3, -1, 421, 0],
    [2, 1, -1, 1, -366, 0],
    [2, 1, 0, 1, -351, 0],
    [4, 0, 0, 1, 331, 0],
    [2, -1, 1, 1, 315, 0],
    [2, -2, 0, -1, 302, 0],
    [0, 0, 1, 3, -283, 0],
    [2, 1, 1, -1, -229, 0],
    [1, 1, 0, -1, 223, 0],
    [1, 1, 0, 1, 223, 0],
    [0, 1, -2, -1, -220, 0],
    [2, 1, -1, -1, -220, 0],
    [1, 0, 1, 1, -185, 0],
    [2, -1, -2, -1, 181, 0],
    [0, 1, 2, 1, -177, 0],
    [4, 0, -2, -1, 176, 0],
    [4, -1, -1, -1, 166, 0],
    [1, 0, 1, -1, -164, 0],
    [4, 0, 1, -1, 132, 0],
    [1, 0, -1, -1, -119, 0],
    [4, -1, 0, -1, 115, 0],
    [2, -2, 0, 1, 107, 0]
];

export class MpaService {
    /**
     * Calculate all MPA parameters and put into structure
     * Note: All inputs values (listed in SPA header file) must already be in structure
     *
     * @param {MpaInput} mpaInput
     * @param {MpaOutput} mpaOutput
     */
    calculate(mpaInput, mpaOutput) {
        mpaOutput.l_prime = moon_mean_longitude(mpaInput.jce);
        mpaOutput.d = moon_mean_elongation(mpaInput.jce);
        mpaOutput.m = sun_mean_anomaly(mpaInput.jce);
        mpaOutput.m_prime = moon_mean_anomaly(mpaInput.jce);
        mpaOutput.f = moon_latitude_argument(mpaInput.jce);

        const mlTerms = {associative: ML_TERMS};
        let sinSumAndCosSum = moon_periodic_term_summation(
            mpaOutput.d,
            mpaOutput.m,
            mpaOutput.m_prime,
            mpaOutput.f,
            mpaInput.jce,
            mlTerms
        );
        mpaOutput.l = sinSumAndCosSum.sin_sum;
        mpaOutput.r = sinSumAndCosSum.cos_sum;
        const mbTerms = {associative: MB_TERMS};
        sinSumAndCosSum = moon_periodic_term_summation(
            mpaOutput.d,
            mpaOutput.m,
            mpaOutput.m_prime,
            mpaOutput.f,
            mpaInput.jce,
            mbTerms
        );
        mpaOutput.b = sinSumAndCosSum.sin_sum;

        const lambdaPrimeAndBeta = moon_longitude_and_latitude(
            mpaInput.jce,
            mpaOutput.l_prime,
            mpaOutput.f,
            mpaOutput.m_prime,
            mpaOutput.l,
            mpaOutput.b
        );
        mpaOutput.lamda_prime = lambdaPrimeAndBeta.lamda_prime;
        mpaOutput.beta = lambdaPrimeAndBeta.beta;

        mpaOutput.cap_delta = moon_earth_distance(mpaOutput.r);
        mpaOutput.pi = moon_equatorial_horiz_parallax(mpaOutput.cap_delta);
        mpaOutput.lamda = apparent_moon_longitude(mpaOutput.lamda_prime, mpaInput.del_psi);

        mpaOutput.alpha = geocentric_right_ascension(mpaOutput.lamda, mpaInput.epsilon, mpaOutput.beta);
        mpaOutput.delta = geocentric_declination(mpaOutput.beta, mpaInput.epsilon, mpaOutput.lamda);

        mpaOutput.h = observer_hour_angle(mpaInput.nu, mpaInput.longitude, mpaOutput.alpha);

        const deltaAlphaAndDeltaPrime = right_ascension_parallax_and_topocentric_dec(
            mpaInput.latitude,
            mpaInput.elevation,
            mpaOutput.pi,
            mpaOutput.h,
            mpaOutput.delta
        );
        mpaOutput.del_alpha = deltaAlphaAndDeltaPrime.delta_alpha;
        mpaOutput.delta_prime = deltaAlphaAndDeltaPrime.delta_prime;

        mpaOutput.alpha_prime = topocentric_right_ascension(mpaOutput.alpha, mpaOutput.del_alpha);
        mpaOutput.h_prime = topocentric_local_hour_angle(mpaOutput.h, mpaOutput.del_alpha);

        mpaOutput.e0 = topocentric_elevation_angle(mpaInput.latitude, mpaOutput.delta_prime, mpaOutput.h_prime);
        mpaOutput.del_e = atmospheric_refraction_correction(
            mpaInput.pressure,
            mpaInput.temperature,
            mpaInput.atmos_refract,
            mpaOutput.e0
        );
        mpaOutput.e = topocentric_elevation_angle_corrected(mpaOutput.e0, mpaOutput.del_e);

        mpaOutput.zenith = topocentric_zenith_angle(mpaOutput.e);
        mpaOutput.azimuth_astro = topocentric_azimuth_angle_astro(
            mpaOutput.h_prime,
            mpaInput.latitude,
            mpaOutput.delta_prime
        );
        mpaOutput.azimuth = topocentric_azimuth_angle(mpaOutput.azimuth_astro);
    }
}

function moon_longitude_and_latitude(jce, l_prime, f, m_prime, l, b) {
    const a1 = 119.75 + 131.849 * jce;
    const a2 = 53.09 + 479264.290 * jce;
    const a3 = 313.45 + 481266.484 * jce;
    const delta_l = 3958 * Math.sin(deg2rad(a1)) + 318 * Math.sin(deg2rad(a2)) + 1962 * Math.sin(deg2rad(l_prime - f));
    const delta_b = -2235 * Math.sin(deg2rad(l_prime)) + 175 * Math.sin(deg2rad(a1 - f)) + 127 * Math.sin(deg2rad(l_prime - m_prime)) + 382 * Math.sin(deg2rad(a3)) + 175 * Math.sin(deg2rad(a1 + f)) - 115 * Math.sin(deg2rad(l_prime + m_prime));
    const lamda_prime = limit_degrees(l_prime + (l + delta_l) / 1000000);
    const beta = limit_degrees((b + delta_b) / 1000000);

    return {lamda_prime: lamda_prime, beta: beta};
}

function moon_periodic_term_summation(d, m, m_prime, f, jce, terms) {
    let e_mult, trig_arg;
    let e = 1.0 - jce * (0.002516 + jce * 0.0000074);
    let sin_sum = 0, cos_sum = 0;
    for (let i = 0; i < terms.associative.length; i++) {
        e_mult = Math.pow(e, Math.abs(terms.associative[i][TERM_M]));
        trig_arg = deg2rad(terms.associative[i][TERM_D] * d + terms.associative[i][TERM_M] * m + terms.associative[i][TERM_F] * f + terms.associative[i][TERM_MPR] * m_prime);
        sin_sum += e_mult * terms.associative[i][TERM_LB] * Math.sin(trig_arg);
        cos_sum += e_mult * terms.associative[i][TERM_R] * Math.cos(trig_arg);
    }

    return {sin_sum: sin_sum, cos_sum: cos_sum};
}

function moon_mean_longitude(jce) {
    return limit_degrees(fourth_order_polynomial(
        -1.0 / 65194000, 1.0 / 538841, -0.0015786, 481267.88123421, 218.3164477, jce
    ));
}

function moon_mean_elongation(jce) {
    return limit_degrees(fourth_order_polynomial(
        -1.0 / 113065000, 1.0 / 545868, -0.0018819, 445267.1114034, 297.8501921, jce
    ));
}

function sun_mean_anomaly(jce) {
    return limit_degrees(third_order_polynomial(
        1.0 / 24490000, -0.0001536, 35999.0502909, 357.5291092, jce
    ));
}

function moon_mean_anomaly(jce) {
    return limit_degrees(fourth_order_polynomial(
        -1.0 / 14712000, 1.0 / 69699, 0.0087414, 477198.8675055, 134.9633964, jce
    ));
}

function moon_latitude_argument(jce) {
    return limit_degrees(fourth_order_polynomial(
        1.0 / 863310000, -1.0 / 3526000, -0.0036539, 483202.0175233, 93.2720950, jce
    ));
}

function moon_earth_distance(r) {
    return 385000.56 + r / 1000;
}

function moon_equatorial_horiz_parallax(delta) {
    return rad2deg(Math.asin(6378.14 / delta));
}

function apparent_moon_longitude(lamda_prime, del_psi) {
    return lamda_prime + del_psi;
}

export {MpaInput, MpaOutput};
