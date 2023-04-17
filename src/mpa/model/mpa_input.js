export class MpaInput {
    longitude;
    latitude;
    elevation;
    pressure;
    temperature;
    atmos_refract;
    jce;
    del_psi;
    epsilon;
    nu;

    constructor(
        longitude,
        latitude,
        elevation,
        pressure,
        temperature,
        atmos_refract,
        jce,
        del_psi,
        epsilon,
        nu
    ) {
        this.longitude = longitude; // Observer longitude (negative west of Greenwich), valid range: -180  to  180 degrees
        this.latitude = latitude; // Observer latitude (negative south of equator), valid range: -90   to   90 degrees
        this.elevation = elevation; // Observer elevation [meters], valid range: -6500000 or higher meters
        this.pressure = pressure; // Annual average local pressure [millibars], valid range:    0 to 5000 millibars
        this.temperature = temperature; // Annual average local temperature [degrees Celsius], valid range: -273 to 6000 degrees Celsius
        this.atmos_refract = atmos_refract; // Atmospheric refraction at sunrise and sunset (0.5667 deg is typical), valid range: -5   to   5 degrees
        this.jce = jce; //Julian ephemeris century
        this.del_psi = del_psi; //nutation longitude [degrees]
        this.epsilon = epsilon; //ecliptic true obliquity  [degrees]
        this.nu = nu; //Greenwich sidereal time [degrees]
    }
}
