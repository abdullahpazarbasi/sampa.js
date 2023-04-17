export class MpaOutput {
    l_prime;
    d;
    m;
    m_prime;
    f;
    l;
    r;
    b;
    lamda_prime;
    beta;
    cap_delta;
    pi;
    lamda;
    alpha;
    delta;
    h;
    del_alpha;
    delta_prime;
    alpha_prime;
    h_prime;
    e0;
    del_e;
    e;
    zenith;
    azimuth_astro;
    azimuth;

    constructor(
        l_prime,
        d,
        m,
        m_prime,
        f,
        l,
        r,
        b,
        lamda_prime,
        beta,
        cap_delta,
        pi,
        lamda,
        alpha,
        delta,
        h,
        del_alpha,
        delta_prime,
        alpha_prime,
        h_prime,
        e0,
        del_e,
        e,
        zenith,
        azimuth_astro,
        azimuth,
    ) {
        this.l_prime = l_prime; //moon mean longitude [degrees]
        this.d = d; //moon mean elongation [degrees]
        this.m = m; //sun mean anomaly [degrees]
        this.m_prime = m_prime; //moon mean anomaly [degrees]
        this.f = f; //moon argument of latitude [degrees]
        this.l = l; //term l
        this.r = r; //term r
        this.b = b; //term b
        this.lamda_prime = lamda_prime; //moon longitude [degrees]
        this.beta = beta; //moon latitude [degrees]
        this.cap_delta = cap_delta; //distance from earth to moon [kilometers]
        this.pi = pi; //moon equatorial horizontal parallax [degrees]
        this.lamda = lamda; //apparent moon longitude [degrees]
        this.alpha = alpha; //geocentric moon right ascension [degrees]
        this.delta = delta; //geocentric moon declination [degrees]
        this.h = h; //observer hour angle [degrees]
        this.del_alpha = del_alpha; //moon right ascension parallax [degrees]
        this.delta_prime = delta_prime; //topocentric moon declination [degrees]
        this.alpha_prime = alpha_prime; //topocentric moon right ascension [degrees]
        this.h_prime = h_prime; //topocentric local hour angle [degrees]
        this.e0 = e0; //topocentric elevation angle (uncorrected) [degrees]
        this.del_e = del_e; //atmospheric refraction correction [degrees]
        this.e = e; //topocentric elevation angle (corrected) [degrees]
        this.zenith = zenith; //topocentric zenith angle [degrees]
        this.azimuth_astro = azimuth_astro; //topocentric azimuth angle (westward from south) [for astronomers]
        this.azimuth = azimuth; //topocentric azimuth angle (eastward from north) [for navigators and solar radiation]
    }
}
