export class MpaResponse {
    l_prime; //moon mean longitude [degrees]
    d; //moon mean elongation [degrees]
    m; //sun mean anomaly [degrees]
    m_prime; //moon mean anomaly [degrees]
    f; //moon argument of latitude [degrees]
    l; //term l
    r; //term r
    b; //term b
    lamda_prime; //moon longitude [degrees]
    beta; //moon latitude [degrees]
    cap_delta; //distance from earth to moon [kilometers]
    pi; //moon equatorial horizontal parallax [degrees]
    lamda; //apparent moon longitude [degrees]
    alpha; //geocentric moon right ascension [degrees]
    delta; //geocentric moon declination [degrees]
    h; //observer hour angle [degrees]
    del_alpha; //moon right ascension parallax [degrees]
    delta_prime; //topocentric moon declination [degrees]
    alpha_prime; //topocentric moon right ascension [degrees]
    h_prime; //topocentric local hour angle [degrees]
    e0; //topocentric elevation angle (uncorrected) [degrees]
    del_e; //atmospheric refraction correction [degrees]
    e; //topocentric elevation angle (corrected) [degrees]
    zenith; //topocentric zenith angle [degrees]
    azimuth_astro; //topocentric azimuth angle (westward from south) [for astronomers]
    azimuth; //topocentric azimuth angle (eastward from north) [for navigators and solar radiation]
}
