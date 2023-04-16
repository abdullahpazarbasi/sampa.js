export class SpaOutput {
    constructor(
        jd,
        jc,
        jde,
        jce,
        jme,
        l,
        b,
        r,
        theta,
        beta,
        x0,
        x1,
        x2,
        x3,
        x4,
        del_psi,
        del_epsilon,
        epsilon0,
        epsilon,
        del_tau,
        lamda,
        nu0,
        nu,
        alpha,
        delta,
        h,
        xi,
        del_alpha,
        delta_prime,
        alpha_prime,
        h_prime,
        e0,
        del_e,
        e,
        eot,
        srha,
        ssha,
        sta,
        zenith,
        azimuth_astro,
        azimuth,
        incidence,
        suntransit,
        sunrise,
        sunset
    ) {
        this.jd = jd; //Julian day
        this.jc = jc; //Julian century
        this.jde = jde; //Julian ephemeris day
        this.jce = jce; //Julian ephemeris century
        this.jme = jme; //Julian ephemeris millennium
        this.l = l; //earth heliocentric longitude [degrees]
        this.b = b; //earth heliocentric latitude [degrees]
        this.r = r; //earth radius vector [Astronomical Units, AU]
        this.theta = theta; //geocentric longitude [degrees]
        this.beta = beta; //geocentric latitude [degrees]
        this.x0 = x0; //mean elongation (moon-sun) [degrees]
        this.x1 = x1; //mean anomaly (sun) [degrees]
        this.x2 = x2; //mean anomaly (moon) [degrees]
        this.x3 = x3; //argument latitude (moon) [degrees]
        this.x4 = x4; //ascending longitude (moon) [degrees]
        this.del_psi = del_psi; //nutation longitude [degrees]
        this.del_epsilon = del_epsilon; //nutation obliquity [degrees]
        this.epsilon0 = epsilon0; //ecliptic mean obliquity [arc seconds]
        this.epsilon = epsilon; //ecliptic true obliquity  [degrees]
        this.del_tau = del_tau; //aberration correction [degrees]
        this.lamda = lamda; //apparent sun longitude [degrees]
        this.nu0 = nu0; //Greenwich mean sidereal time [degrees]
        this.nu = nu; //Greenwich sidereal time [degrees]
        this.alpha = alpha; //geocentric sun right ascension [degrees]
        this.delta = delta; //geocentric sun declination [degrees]
        this.h = h; //observer hour angle [degrees]
        this.xi = xi; //sun equatorial horizontal parallax [degrees]
        this.del_alpha = del_alpha; //sun right ascension parallax [degrees]
        this.delta_prime = delta_prime; //topocentric sun declination [degrees]
        this.alpha_prime = alpha_prime; //topocentric sun right ascension [degrees]
        this.h_prime = h_prime; //topocentric local hour angle [degrees]
        this.e0 = e0; //topocentric elevation angle (uncorrected) [degrees]
        this.del_e = del_e; //atmospheric refraction correction [degrees]
        this.e = e; //topocentric elevation angle (corrected) [degrees]
        this.eot = eot; //equation of time [minutes]
        this.srha = srha; //sunrise hour angle [degrees]
        this.ssha = ssha; //sunset hour angle [degrees]
        this.sta = sta; //sun transit altitude [degrees]
        this.zenith = zenith; //topocentric zenith angle [degrees]
        this.azimuth_astro = azimuth_astro; //topocentric azimuth angle (westward from south) [for astronomers]
        this.azimuth = azimuth; //topocentric azimuth angle (eastward from north) [for navigators and solar radiation]
        this.incidence = incidence; //surface incidence angle [degrees]
        this.suntransit = suntransit; //local sun transit time (or solar noon) [fractional hour]
        this.sunrise = sunrise; //local sunrise time (+/- 30 seconds) [fractional hour]
        this.sunset = sunset; //local sunset time (+/- 30 seconds) [fractional hour]
    }
}