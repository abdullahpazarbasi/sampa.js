import {SpaInput} from './model/spa_input.js';
import {SpaOutput} from './model/spa_output.js';
import '../utils/utils.js';
import {
    dayfrac_to_local_hr,
    deg2rad,
    julian_century,
    julian_day,
    julian_ephemeris_century,
    julian_ephemeris_day,
    julian_ephemeris_millennium,
    limit_degrees,
    limit_degrees180, limit_degrees180pm,
    limit_minutes,
    limit_zero2one,
    rad2deg,
    third_order_polynomial
} from "../utils/utils.js";

//enumeration for function codes to select desired final outputs from SPA
export const SPA_ZA = 0;     //calculate zenith and azimuth
export const SPA_ZA_INC = 1; //calculate zenith, azimuth, and incidence
export const SPA_ZA_RTS = 2; //calculate zenith, azimuth, and sun rise/transit/set values
export const SPA_ALL = 3;    //calculate all SPA output values

const SUN_RADIUS = 0.26667;

const L_COUNT = 6;
const B_COUNT = 2;
const R_COUNT = 5;
const Y_COUNT = 63;

const TERM_A = 0;
const TERM_B = 1;
const TERM_C = 2;
const TERM_COUNT = 3;

const TERM_X0 = 0;
const TERM_X1 = 1;
const TERM_X2 = 2;
const TERM_X3 = 3;
const TERM_X4 = 4;
const TERM_X_COUNT = 5;

const TERM_PSI_A = 0;
const TERM_PSI_B = 1;
const TERM_EPS_C = 2;
const TERM_EPS_D = 3;
const TERM_PE_COUNT = 4;

const JD_MINUS = 0;
const JD_ZERO = 1;
const JD_PLUS = 2;
const JD_COUNT = 3;

const SUN_TRANSIT = 0;
const SUN_RISE = 1;
const SUN_SET = 2;
const SUN_COUNT = 3;

const TERM_Y_COUNT = 5;

const l_subcount = [64, 34, 20, 7, 3, 1];
const b_subcount = [5, 2];
const r_subcount = [40, 10, 6, 2, 1];

///////////////////////////////////////////////////
///  Earth Periodic Terms
///////////////////////////////////////////////////

const L_TERMS = [
    [
        [175347046.0, 0, 0],
        [3341656.0, 4.6692568, 6283.07585],
        [34894.0, 4.6261, 12566.1517],
        [3497.0, 2.7441, 5753.3849],
        [3418.0, 2.8289, 3.5231],
        [3136.0, 3.6277, 77713.7715],
        [2676.0, 4.4181, 7860.4194],
        [2343.0, 6.1352, 3930.2097],
        [1324.0, 0.7425, 11506.7698],
        [1273.0, 2.0371, 529.691],
        [1199.0, 1.1096, 1577.3435],
        [990, 5.233, 5884.927],
        [902, 2.045, 26.298],
        [857, 3.508, 398.149],
        [780, 1.179, 5223.694],
        [753, 2.533, 5507.553],
        [505, 4.583, 18849.228],
        [492, 4.205, 775.523],
        [357, 2.92, 0.067],
        [317, 5.849, 11790.629],
        [284, 1.899, 796.298],
        [271, 0.315, 10977.079],
        [243, 0.345, 5486.778],
        [206, 4.806, 2544.314],
        [205, 1.869, 5573.143],
        [202, 2.458, 6069.777],
        [156, 0.833, 213.299],
        [132, 3.411, 2942.463],
        [126, 1.083, 20.775],
        [115, 0.645, 0.98],
        [103, 0.636, 4694.003],
        [102, 0.976, 15720.839],
        [102, 4.267, 7.114],
        [99, 6.21, 2146.17],
        [98, 0.68, 155.42],
        [86, 5.98, 161000.69],
        [85, 1.3, 6275.96],
        [85, 3.67, 71430.7],
        [80, 1.81, 17260.15],
        [79, 3.04, 12036.46],
        [75, 1.76, 5088.63],
        [74, 3.5, 3154.69],
        [74, 4.68, 801.82],
        [70, 0.83, 9437.76],
        [62, 3.98, 8827.39],
        [61, 1.82, 7084.9],
        [57, 2.78, 6286.6],
        [56, 4.39, 14143.5],
        [56, 3.47, 6279.55],
        [52, 0.19, 12139.55],
        [52, 1.33, 1748.02],
        [51, 0.28, 5856.48],
        [49, 0.49, 1194.45],
        [41, 5.37, 8429.24],
        [41, 2.4, 19651.05],
        [39, 6.17, 10447.39],
        [37, 6.04, 10213.29],
        [37, 2.57, 1059.38],
        [36, 1.71, 2352.87],
        [36, 1.78, 6812.77],
        [33, 0.59, 17789.85],
        [30, 0.44, 83996.85],
        [30, 2.74, 1349.87],
        [25, 3.16, 4690.48]
    ],
    [
        [628331966747.0, 0, 0],
        [206059.0, 2.678235, 6283.07585],
        [4303.0, 2.6351, 12566.1517],
        [425.0, 1.59, 3.523],
        [119.0, 5.796, 26.298],
        [109.0, 2.966, 1577.344],
        [93, 2.59, 18849.23],
        [72, 1.14, 529.69],
        [68, 1.87, 398.15],
        [67, 4.41, 5507.55],
        [59, 2.89, 5223.69],
        [56, 2.17, 155.42],
        [45, 0.4, 796.3],
        [36, 0.47, 775.52],
        [29, 2.65, 7.11],
        [21, 5.34, 0.98],
        [19, 1.85, 5486.78],
        [19, 4.97, 213.3],
        [17, 2.99, 6275.96],
        [16, 0.03, 2544.31],
        [16, 1.43, 2146.17],
        [15, 1.21, 10977.08],
        [12, 2.83, 1748.02],
        [12, 3.26, 5088.63],
        [12, 5.27, 1194.45],
        [12, 2.08, 4694],
        [11, 0.77, 553.57],
        [10, 1.3, 6286.6],
        [10, 4.24, 1349.87],
        [9, 2.7, 242.73],
        [9, 5.64, 951.72],
        [8, 5.3, 2352.87],
        [6, 2.65, 9437.76],
        [6, 4.67, 4690.48]
    ],
    [
        [52919.0, 0, 0],
        [8720.0, 1.0721, 6283.0758],
        [309.0, 0.867, 12566.152],
        [27, 0.05, 3.52],
        [16, 5.19, 26.3],
        [16, 3.68, 155.42],
        [10, 0.76, 18849.23],
        [9, 2.06, 77713.77],
        [7, 0.83, 775.52],
        [5, 4.66, 1577.34],
        [4, 1.03, 7.11],
        [4, 3.44, 5573.14],
        [3, 5.14, 796.3],
        [3, 6.05, 5507.55],
        [3, 1.19, 242.73],
        [3, 6.12, 529.69],
        [3, 0.31, 398.15],
        [3, 2.28, 553.57],
        [2, 4.38, 5223.69],
        [2, 3.75, 0.98]
    ],
    [
        [289.0, 5.844, 6283.076],
        [35, 0, 0],
        [17, 5.49, 12566.15],
        [3, 5.2, 155.42],
        [1, 4.72, 3.52],
        [1, 5.3, 18849.23],
        [1, 5.97, 242.73]
    ],
    [
        [114.0, 3.142, 0],
        [8, 4.13, 6283.08],
        [1, 3.84, 12566.15]
    ],
    [
        [1, 3.14, 0]
    ]
];

const B_TERMS = [
    [
        [280.0, 3.199, 84334.662],
        [102.0, 5.422, 5507.553],
        [80, 3.88, 5223.69],
        [44, 3.7, 2352.87],
        [32, 4, 1577.34]
    ],
    [
        [9, 3.9, 5507.55],
        [6, 1.73, 5223.69]
    ]
];

const R_TERMS = [
    [
        [100013989.0, 0, 0],
        [1670700.0, 3.0984635, 6283.07585],
        [13956.0, 3.05525, 12566.1517],
        [3084.0, 5.1985, 77713.7715],
        [1628.0, 1.1739, 5753.3849],
        [1576.0, 2.8469, 7860.4194],
        [925.0, 5.453, 11506.77],
        [542.0, 4.564, 3930.21],
        [472.0, 3.661, 5884.927],
        [346.0, 0.964, 5507.553],
        [329.0, 5.9, 5223.694],
        [307.0, 0.299, 5573.143],
        [243.0, 4.273, 11790.629],
        [212.0, 5.847, 1577.344],
        [186.0, 5.022, 10977.079],
        [175.0, 3.012, 18849.228],
        [110.0, 5.055, 5486.778],
        [98, 0.89, 6069.78],
        [86, 5.69, 15720.84],
        [86, 1.27, 161000.69],
        [65, 0.27, 17260.15],
        [63, 0.92, 529.69],
        [57, 2.01, 83996.85],
        [56, 5.24, 71430.7],
        [49, 3.25, 2544.31],
        [47, 2.58, 775.52],
        [45, 5.54, 9437.76],
        [43, 6.01, 6275.96],
        [39, 5.36, 4694],
        [38, 2.39, 8827.39],
        [37, 0.83, 19651.05],
        [37, 4.9, 12139.55],
        [36, 1.67, 12036.46],
        [35, 1.84, 2942.46],
        [33, 0.24, 7084.9],
        [32, 0.18, 5088.63],
        [32, 1.78, 398.15],
        [28, 1.21, 6286.6],
        [28, 1.9, 6279.55],
        [26, 4.59, 10447.39]
    ],
    [
        [103019.0, 1.10749, 6283.07585],
        [1721.0, 1.0644, 12566.1517],
        [702.0, 3.142, 0],
        [32, 1.02, 18849.23],
        [31, 2.84, 5507.55],
        [25, 1.32, 5223.69],
        [18, 1.42, 1577.34],
        [10, 5.91, 10977.08],
        [9, 1.42, 6275.96],
        [9, 0.27, 5486.78]
    ],
    [
        [4359.0, 5.7846, 6283.0758],
        [124.0, 5.579, 12566.152],
        [12, 3.14, 0],
        [9, 3.63, 77713.77],
        [6, 1.87, 5573.14],
        [3, 5.47, 18849.23]
    ],
    [
        [145.0, 4.273, 6283.076],
        [7, 3.92, 12566.15]
    ],
    [
        [4, 2.56, 6283.08]
    ]
];

////////////////////////////////////////////////////////////////
///  Periodic Terms for the nutation in longitude and obliquity
////////////////////////////////////////////////////////////////

const Y_TERMS = [
    [0, 0, 0, 0, 1],
    [-2, 0, 0, 2, 2],
    [0, 0, 0, 2, 2],
    [0, 0, 0, 0, 2],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [-2, 1, 0, 2, 2],
    [0, 0, 0, 2, 1],
    [0, 0, 1, 2, 2],
    [-2, -1, 0, 2, 2],
    [-2, 0, 1, 0, 0],
    [-2, 0, 0, 2, 1],
    [0, 0, -1, 2, 2],
    [2, 0, 0, 0, 0],
    [0, 0, 1, 0, 1],
    [2, 0, -1, 2, 2],
    [0, 0, -1, 0, 1],
    [0, 0, 1, 2, 1],
    [-2, 0, 2, 0, 0],
    [0, 0, -2, 2, 1],
    [2, 0, 0, 2, 2],
    [0, 0, 2, 2, 2],
    [0, 0, 2, 0, 0],
    [-2, 0, 1, 2, 2],
    [0, 0, 0, 2, 0],
    [-2, 0, 0, 2, 0],
    [0, 0, -1, 2, 1],
    [0, 2, 0, 0, 0],
    [2, 0, -1, 0, 1],
    [-2, 2, 0, 2, 2],
    [0, 1, 0, 0, 1],
    [-2, 0, 1, 0, 1],
    [0, -1, 0, 0, 1],
    [0, 0, 2, -2, 0],
    [2, 0, -1, 2, 1],
    [2, 0, 1, 2, 2],
    [0, 1, 0, 2, 2],
    [-2, 1, 1, 0, 0],
    [0, -1, 0, 2, 2],
    [2, 0, 0, 2, 1],
    [2, 0, 1, 0, 0],
    [-2, 0, 2, 2, 2],
    [-2, 0, 1, 2, 1],
    [2, 0, -2, 0, 1],
    [2, 0, 0, 0, 1],
    [0, -1, 1, 0, 0],
    [-2, -1, 0, 2, 1],
    [-2, 0, 0, 0, 1],
    [0, 0, 2, 2, 1],
    [-2, 0, 2, 0, 1],
    [-2, 1, 0, 2, 1],
    [0, 0, 1, -2, 0],
    [-1, 0, 1, 0, 0],
    [-2, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 2, 0],
    [0, 0, -2, 2, 2],
    [-1, -1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, -1, 1, 2, 2],
    [2, -1, -1, 2, 2],
    [0, 0, 3, 2, 2],
    [2, -1, 0, 2, 2],
];

const PE_TERMS = [
    [-171996, -174.2, 92025, 8.9],
    [-13187, -1.6, 5736, -3.1],
    [-2274, -0.2, 977, -0.5],
    [2062, 0.2, -895, 0.5],
    [1426, -3.4, 54, -0.1],
    [712, 0.1, -7, 0],
    [-517, 1.2, 224, -0.6],
    [-386, -0.4, 200, 0],
    [-301, 0, 129, -0.1],
    [217, -0.5, -95, 0.3],
    [-158, 0, 0, 0],
    [129, 0.1, -70, 0],
    [123, 0, -53, 0],
    [63, 0, 0, 0],
    [63, 0.1, -33, 0],
    [-59, 0, 26, 0],
    [-58, -0.1, 32, 0],
    [-51, 0, 27, 0],
    [48, 0, 0, 0],
    [46, 0, -24, 0],
    [-38, 0, 16, 0],
    [-31, 0, 13, 0],
    [29, 0, 0, 0],
    [29, 0, -12, 0],
    [26, 0, 0, 0],
    [-22, 0, 0, 0],
    [21, 0, -10, 0],
    [17, -0.1, 0, 0],
    [16, 0, -8, 0],
    [-16, 0.1, 7, 0],
    [-15, 0, 9, 0],
    [-13, 0, 7, 0],
    [-12, 0, 6, 0],
    [11, 0, 0, 0],
    [-10, 0, 5, 0],
    [-8, 0, 3, 0],
    [7, 0, -3, 0],
    [-7, 0, 0, 0],
    [-7, 0, 3, 0],
    [-7, 0, 3, 0],
    [6, 0, 0, 0],
    [6, 0, -3, 0],
    [6, 0, -3, 0],
    [-6, 0, 3, 0],
    [-6, 0, 3, 0],
    [5, 0, 0, 0],
    [-5, 0, 3, 0],
    [-5, 0, 3, 0],
    [-5, 0, 3, 0],
    [4, 0, 0, 0],
    [4, 0, 0, 0],
    [4, 0, 0, 0],
    [-4, 0, 0, 0],
    [-4, 0, 0, 0],
    [-4, 0, 0, 0],
    [3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
    [-3, 0, 0, 0],
];

export class SpaService {
    // Calculate required SPA parameters to get the right ascension (alpha) and declination (delta)
    // Note: JD must be already calculated and in structure
    calculate_geocentric_sun_right_ascension_and_declination(spaInput, spaOutput) {
        let x = new Array(TERM_X_COUNT);

        spaOutput.jc = julian_century(spaOutput.jd);

        spaOutput.jde = julian_ephemeris_day(spaOutput.jd, spaInput.delta_t);
        spaOutput.jce = julian_ephemeris_century(spaOutput.jde);
        spaOutput.jme = julian_ephemeris_millennium(spaOutput.jce);

        spaOutput.l = earth_heliocentric_longitude(spaOutput.jme);
        spaOutput.b = earth_heliocentric_latitude(spaOutput.jme);
        spaOutput.r = earth_radius_vector(spaOutput.jme);

        spaOutput.theta = geocentric_longitude(spaOutput.l);
        spaOutput.beta = geocentric_latitude(spaOutput.b);

        x[TERM_X0] = spaOutput.x0 = mean_elongation_moon_sun(spaOutput.jce);
        x[TERM_X1] = spaOutput.x1 = mean_anomaly_sun(spaOutput.jce);
        x[TERM_X2] = spaOutput.x2 = mean_anomaly_moon(spaOutput.jce);
        x[TERM_X3] = spaOutput.x3 = argument_latitude_moon(spaOutput.jce);
        x[TERM_X4] = spaOutput.x4 = ascending_longitude_moon(spaOutput.jce);

        const delPsiAndDelEpsilon = nutation_longitude_and_obliquity(spaOutput.jce, x);
        spaOutput.del_psi = delPsiAndDelEpsilon.del_psi;
        spaOutput.del_epsilon = delPsiAndDelEpsilon.del_epsilon;

        spaOutput.epsilon0 = ecliptic_mean_obliquity(spaOutput.jme);
        spaOutput.epsilon = ecliptic_true_obliquity(spaOutput.del_epsilon, spaOutput.epsilon0);

        spaOutput.del_tau = aberration_correction(spaOutput.r);
        spaOutput.lamda = apparent_sun_longitude(spaOutput.theta, spaOutput.del_psi, spaOutput.del_tau);
        spaOutput.nu0 = greenwich_mean_sidereal_time(spaOutput.jd, spaOutput.jc);
        spaOutput.nu = greenwich_sidereal_time(spaOutput.nu0, spaOutput.del_psi, spaOutput.epsilon);

        spaOutput.alpha = geocentric_right_ascension(spaOutput.lamda, spaOutput.epsilon, spaOutput.beta);
        spaOutput.delta = geocentric_declination(spaOutput.beta, spaOutput.epsilon, spaOutput.lamda);
    }

    // Calculate Equation of Time (EOT) and Sun Rise, Transit, & Set (RTS)
    calculate_eot_and_sun_rise_transit_set(spaInput, spaOutput) {
        let nu, m, h0, n;
        let alpha = {associative: new Array(JD_COUNT)};
        let delta = {associative: new Array(JD_COUNT)};
        let m_rts = {associative: new Array(SUN_COUNT)};
        let nu_rts = {associative: new Array(SUN_COUNT)};
        let h_rts = {associative: new Array(SUN_COUNT)};
        let alpha_prime = {associative: new Array(SUN_COUNT)};
        let delta_prime = {associative: new Array(SUN_COUNT)};
        let h_prime = {associative: new Array(SUN_COUNT)};
        const h0_prime = -1 * (SUN_RADIUS + spaInput.atmos_refract);

        const sun_inp = Object.assign({}, spaInput);
        const sun_rts = Object.assign({}, spaOutput);
        m = sun_mean_longitude(spaOutput.jme);
        spaOutput.eot = eot(m, spaOutput.alpha, spaOutput.del_psi, spaOutput.epsilon);

        sun_inp.hour = sun_inp.minute = sun_inp.second = 0;
        sun_inp.delta_ut1 = sun_inp.timezone = 0.0;

        sun_rts.jd = julian_day(
            sun_inp.year,
            sun_inp.month,
            sun_inp.day,
            sun_inp.hour,
            sun_inp.minute,
            sun_inp.second,
            sun_inp.delta_ut1,
            sun_inp.timezone
        );
        this.calculate_geocentric_sun_right_ascension_and_declination(sun_inp, sun_rts);
        nu = sun_rts.nu;

        sun_inp.delta_t = 0;
        sun_rts.jd--;
        for (let i = 0; i < JD_COUNT; i++) {
            this.calculate_geocentric_sun_right_ascension_and_declination(sun_inp, sun_rts);
            alpha.associative[i] = sun_rts.alpha;
            delta.associative[i] = sun_rts.delta;
            sun_rts.jd++;
        }

        m_rts.associative[SUN_TRANSIT] = approx_sun_transit_time(alpha.associative[JD_ZERO], spaInput.longitude, nu);
        h0 = sun_hour_angle_at_rise_set(spaInput.latitude, delta.associative[JD_ZERO], h0_prime);

        if (h0 >= 0) {
            approx_sun_rise_and_set(m_rts, h0);
            for (let i = 0; i < SUN_COUNT; i++) {
                nu_rts.associative[i] = nu + 360.985647 * m_rts.associative[i];

                n = m_rts.associative[i] + spaInput.delta_t / 86400.0;
                alpha_prime.associative[i] = rts_alpha_delta_prime(alpha, n);
                delta_prime.associative[i] = rts_alpha_delta_prime(delta, n);

                h_prime.associative[i] = limit_degrees180pm(
                    nu_rts.associative[i] + spaInput.longitude - alpha_prime.associative[i]
                );

                h_rts.associative[i] = rts_sun_altitude(spaInput.latitude, delta_prime.associative[i], h_prime.associative[i]);
            }

            spaOutput.srha = h_prime.associative[SUN_RISE];
            spaOutput.ssha = h_prime.associative[SUN_SET];
            spaOutput.sta = h_rts.associative[SUN_TRANSIT];
            spaOutput.suntransit = dayfrac_to_local_hr(m_rts.associative[SUN_TRANSIT] - h_prime.associative[SUN_TRANSIT] / 360.0, spaInput.timezone);
            spaOutput.sunrise = dayfrac_to_local_hr(sun_rise_and_set(m_rts, h_rts, delta_prime, spaInput.latitude, h_prime, h0_prime, SUN_RISE), spaInput.timezone);
            spaOutput.sunset = dayfrac_to_local_hr(sun_rise_and_set(m_rts, h_rts, delta_prime, spaInput.latitude, h_prime, h0_prime, SUN_SET), spaInput.timezone);
        } else {
            spaOutput.srha = spaOutput.ssha = spaOutput.sta = spaOutput.suntransit = spaOutput.sunrise = spaOutput.sunset = -99999;
        }
    }

    // Calculate all SPA parameters and put into structure
    // Note: All inputs values (listed in header file) must already be in structure
    calculate(spaInput, spaOutput) {
        const result = spaInput.validate();
        if (result === 0) {
            spaOutput.jd = julian_day(
                spaInput.year,
                spaInput.month,
                spaInput.day,
                spaInput.hour,
                spaInput.minute,
                spaInput.second,
                spaInput.delta_ut1,
                spaInput.timezone
            );

            this.calculate_geocentric_sun_right_ascension_and_declination(spaInput, spaOutput);

            spaOutput.h = observer_hour_angle(spaOutput.nu, spaInput.longitude, spaOutput.alpha);
            spaOutput.xi = sun_equatorial_horizontal_parallax(spaOutput.r);

            const deltaAlphaAndDeltaPrime = right_ascension_parallax_and_topocentric_dec(
                spaInput.latitude,
                spaInput.elevation,
                spaOutput.xi,
                spaOutput.h,
                spaOutput.delta
            );
            spaOutput.del_alpha = deltaAlphaAndDeltaPrime.delta_alpha;
            spaOutput.delta_prime = deltaAlphaAndDeltaPrime.delta_prime;

            spaOutput.alpha_prime = topocentric_right_ascension(spaOutput.alpha, spaOutput.del_alpha);
            spaOutput.h_prime = topocentric_local_hour_angle(spaOutput.h, spaOutput.del_alpha);

            spaOutput.e0 = topocentric_elevation_angle(spaInput.latitude, spaOutput.delta_prime, spaOutput.h_prime);
            spaOutput.del_e = atmospheric_refraction_correction(
                spaInput.pressure,
                spaInput.temperature,
                spaInput.atmos_refract,
                spaOutput.e0
            );
            spaOutput.e = topocentric_elevation_angle_corrected(spaOutput.e0, spaOutput.del_e);

            spaOutput.zenith = topocentric_zenith_angle(spaOutput.e);
            spaOutput.azimuth_astro = topocentric_azimuth_angle_astro(
                spaOutput.h_prime,
                spaInput.latitude,
                spaOutput.delta_prime
            );
            spaOutput.azimuth = topocentric_azimuth_angle(spaOutput.azimuth_astro);

            if ((spaInput.function === SPA_ZA_INC) || (spaInput.function === SPA_ALL))
                spaOutput.incidence = surface_incidence_angle(
                    spaOutput.zenith,
                    spaOutput.azimuth_astro,
                    spaInput.azm_rotation,
                    spaInput.slope
                );

            if ((spaInput.function === SPA_ZA_RTS) || (spaInput.function === SPA_ALL)) {
                this.calculate_eot_and_sun_rise_transit_set(spaInput, spaOutput);
            }
        }

        return result;
    }
}

function earth_periodic_term_summation(terms, count, jme) {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += terms[i][TERM_A] * Math.cos(terms[i][TERM_B] + terms[i][TERM_C] * jme);
    }

    return sum;
}

function earth_values(term_sum, count, jme) {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += term_sum[i] * Math.pow(jme, i);
    }
    sum /= 1.0e8;

    return sum;
}

function earth_heliocentric_longitude(jme) {
    const sum = new Array(L_COUNT);
    for (let i = 0; i < L_COUNT; i++) {
        sum[i] = earth_periodic_term_summation(L_TERMS[i], l_subcount[i], jme);
    }

    return limit_degrees(rad2deg(earth_values(sum, L_COUNT, jme)));
}

function earth_heliocentric_latitude(jme) {
    const sum = new Array(B_COUNT);

    for (let i = 0; i < B_COUNT; i++) {
        sum[i] = earth_periodic_term_summation(B_TERMS[i], b_subcount[i], jme);
    }

    return rad2deg(earth_values(sum, B_COUNT, jme));
}

function earth_radius_vector(jme) {
    const sum = new Array(R_COUNT);
    for (let i = 0; i < R_COUNT; i++) {
        sum[i] = earth_periodic_term_summation(R_TERMS[i], r_subcount[i], jme);
    }

    return earth_values(sum, R_COUNT, jme);
}

function geocentric_longitude(l) {
    let theta = l + 180.0;
    if (theta >= 360.0) {
        theta -= 360.0;
    }

    return theta;
}

function geocentric_latitude(b) {
    return -b;
}

function mean_elongation_moon_sun(jce) {
    return third_order_polynomial(1.0 / 189474.0, -0.0019142, 445267.11148, 297.85036, jce);
}

function mean_anomaly_sun(jce) {
    return third_order_polynomial(-1.0 / 300000.0, -0.0001603, 35999.05034, 357.52772, jce);
}

function mean_anomaly_moon(jce) {
    return third_order_polynomial(1.0 / 56250.0, 0.0086972, 477198.867398, 134.96298, jce);
}

function argument_latitude_moon(jce) {
    return third_order_polynomial(1.0 / 327270.0, -0.0036825, 483202.017538, 93.27191, jce);
}

function ascending_longitude_moon(jce) {
    return third_order_polynomial(1.0 / 450000.0, 0.0020708, -1934.136261, 125.04452, jce);
}

function xy_term_summation(i, x) {
    let sum = 0;
    for (let j = 0; j < TERM_Y_COUNT; j++) {
        sum += x[j] * Y_TERMS[i][j];
    }

    return sum;
}

function nutation_longitude_and_obliquity(jce, x) {
    let i;
    let xy_term_sum, sum_psi = 0, sum_epsilon = 0;

    for (i = 0; i < Y_COUNT; i++) {
        xy_term_sum = deg2rad(xy_term_summation(i, x));
        sum_psi += (PE_TERMS[i][TERM_PSI_A] + jce * PE_TERMS[i][TERM_PSI_B]) * Math.sin(xy_term_sum);
        sum_epsilon += (PE_TERMS[i][TERM_EPS_C] + jce * PE_TERMS[i][TERM_EPS_D]) * Math.cos(xy_term_sum);
    }

    const del_psi = sum_psi / 36000000.0;
    const del_epsilon = sum_epsilon / 36000000.0;

    return {del_psi: del_psi, del_epsilon: del_epsilon};
}

function ecliptic_mean_obliquity(jme) {
    const u = jme / 10.0;

    return 84381.448 + u * (-4680.93 + u * (-1.55 + u * (1999.25 + u * (-51.38 + u * (-249.67 +
        u * (-39.05 + u * (7.12 + u * (27.87 + u * (5.79 + u * 2.45)))))))));
}

function ecliptic_true_obliquity(delta_epsilon, epsilon0) {
    return delta_epsilon + epsilon0 / 3600.0;
}

function aberration_correction(r) {
    return -20.4898 / (3600.0 * r);
}

function apparent_sun_longitude(theta, delta_psi, delta_tau) {
    return theta + delta_psi + delta_tau;
}

function greenwich_mean_sidereal_time(jd, jc) {
    return limit_degrees(280.46061837 + 360.98564736629 * (jd - 2451545.0) + jc * jc * (0.000387933 - jc / 38710000.0));
}

function greenwich_sidereal_time(nu0, delta_psi, epsilon) {
    return nu0 + delta_psi * Math.cos(deg2rad(epsilon));
}

function geocentric_right_ascension(lamda, epsilon, beta) {
    const lamda_rad = deg2rad(lamda);
    const epsilon_rad = deg2rad(epsilon);

    return limit_degrees(rad2deg(Math.atan2(Math.sin(lamda_rad) * Math.cos(epsilon_rad) - Math.tan(deg2rad(beta)) * Math.sin(epsilon_rad), Math.cos(lamda_rad))));
}

function geocentric_declination(beta, epsilon, lamda) {
    const beta_rad = deg2rad(beta);
    const epsilon_rad = deg2rad(epsilon);

    return rad2deg(Math.asin(Math.sin(beta_rad) * Math.cos(epsilon_rad) + Math.cos(beta_rad) * Math.sin(epsilon_rad) * Math.sin(deg2rad(lamda))));
}

function observer_hour_angle(nu, longitude, alpha_deg) {
    return limit_degrees(nu + longitude - alpha_deg);
}

function sun_equatorial_horizontal_parallax(r) {
    return 8.794 / (3600.0 * r);
}

function right_ascension_parallax_and_topocentric_dec(latitude, elevation, xi, h, delta) {
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

function topocentric_right_ascension(alpha_deg, delta_alpha) {
    return alpha_deg + delta_alpha;
}

function topocentric_local_hour_angle(h, delta_alpha) {
    return h - delta_alpha;
}

function topocentric_elevation_angle(latitude, delta_prime, h_prime) {
    const lat_rad = deg2rad(latitude);
    const delta_prime_rad = deg2rad(delta_prime);

    return rad2deg(Math.asin(Math.sin(lat_rad) * Math.sin(delta_prime_rad) +
        Math.cos(lat_rad) * Math.cos(delta_prime_rad) * Math.cos(deg2rad(h_prime))));
}

function atmospheric_refraction_correction(pressure, temperature, atmos_refract, e0) {
    let del_e = 0;
    if (e0 >= -1 * (SUN_RADIUS + atmos_refract)) {
        del_e = (pressure / 1010.0) * (283.0 / (273.0 + temperature)) *
            1.02 / (60.0 * Math.tan(deg2rad(e0 + 10.3 / (e0 + 5.11))));
    }

    return del_e;
}

function topocentric_elevation_angle_corrected(e0, delta_e) {
    return e0 + delta_e;
}

function topocentric_zenith_angle(e) {
    return 90.0 - e;
}

function topocentric_azimuth_angle_astro(h_prime, latitude, delta_prime) {
    const h_prime_rad = deg2rad(h_prime);
    const lat_rad = deg2rad(latitude);

    return limit_degrees(rad2deg(Math.atan2(Math.sin(h_prime_rad),
        Math.cos(h_prime_rad) * Math.sin(lat_rad) - Math.tan(deg2rad(delta_prime)) * Math.cos(lat_rad))));
}

function topocentric_azimuth_angle(azimuth_astro) {
    return limit_degrees(azimuth_astro + 180.0);
}

function surface_incidence_angle(zenith, azimuth_astro, azm_rotation, slope) {
    const zenith_rad = deg2rad(zenith);
    const slope_rad = deg2rad(slope);

    return rad2deg(
        Math.acos(
            Math.cos(zenith_rad) * Math.cos(slope_rad) +
            Math.sin(slope_rad) * Math.sin(zenith_rad) * Math.cos(deg2rad(azimuth_astro - azm_rotation))
        )
    );
}

function sun_mean_longitude(jme) {
    return limit_degrees(
        280.4664567 +
        jme * (
            360007.6982779 +
            jme * (
                0.03032028 +
                jme * (
                    1 / 49931.0 +
                    jme * (
                        -1 / 15300.0 +
                        jme * (-1 / 2000000.0)
                    )
                )
            )
        )
    );
}

function eot(m, alpha, del_psi, epsilon) {
    return limit_minutes(4.0 * (m - 0.0057183 - alpha + del_psi * Math.cos(deg2rad(epsilon))));
}

function approx_sun_transit_time(alpha_zero, longitude, nu) {
    return (alpha_zero - longitude - nu) / 360.0;
}

function sun_hour_angle_at_rise_set(latitude, delta_zero, h0_prime) {
    let h0 = -99999;
    const latitude_rad = deg2rad(latitude);
    const delta_zero_rad = deg2rad(delta_zero);
    const argument = (Math.sin(deg2rad(h0_prime)) - Math.sin(latitude_rad) * Math.sin(delta_zero_rad)) / (Math.cos(latitude_rad) * Math.cos(delta_zero_rad));

    if (Math.abs(argument) <= 1) {
        h0 = limit_degrees180(rad2deg(Math.acos(argument)));
    }

    return h0;
}

function approx_sun_rise_and_set(m_rts, h0) {
    const h0_dfrac = h0 / 360.0;

    m_rts.associative[SUN_RISE] = limit_zero2one(m_rts.associative[SUN_TRANSIT] - h0_dfrac);
    m_rts.associative[SUN_SET] = limit_zero2one(m_rts.associative[SUN_TRANSIT] + h0_dfrac);
    m_rts.associative[SUN_TRANSIT] = limit_zero2one(m_rts.associative[SUN_TRANSIT]);
}

function rts_alpha_delta_prime(ad, n) {
    let a = ad.associative[JD_ZERO] - ad.associative[JD_MINUS];
    let b = ad.associative[JD_PLUS] - ad.associative[JD_ZERO];

    if (Math.abs(a) >= 2.0) {
        a = limit_zero2one(a);
    }

    if (Math.abs(b) >= 2.0) {
        b = limit_zero2one(b);
    }

    return ad.associative[JD_ZERO] + n * (a + b + (b - a) * n) / 2.0;
}

function rts_sun_altitude(latitude, delta_prime, h_prime) {
    const latitude_rad = deg2rad(latitude);
    const delta_prime_rad = deg2rad(delta_prime);

    return rad2deg(Math.asin(Math.sin(latitude_rad) * Math.sin(delta_prime_rad) + Math.cos(latitude_rad) * Math.cos(delta_prime_rad) * Math.cos(deg2rad(h_prime))));
}

function sun_rise_and_set(m_rts, h_rts, delta_prime, latitude, h_prime, h0_prime, sun) {
    return m_rts.associative[sun] + (h_rts.associative[sun] - h0_prime) / (360.0 * Math.cos(deg2rad(delta_prime.associative[sun])) * Math.cos(deg2rad(latitude)) * Math.sin(deg2rad(h_prime.associative[sun])));
}

export {SpaInput, SpaOutput};