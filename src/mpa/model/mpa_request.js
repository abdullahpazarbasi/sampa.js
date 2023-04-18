export class MpaRequest {
    longitude; // Observer longitude (negative west of Greenwich), valid range: -180 to 180 degrees
    latitude; // Observer latitude (negative south of equator), valid range: -90 to 90 degrees
    elevation; // Observer elevation [meters], valid range: -6500000 or higher meters
    pressure; // Annual average local pressure [millibars], valid range: 0 to 5000 millibars
    temperature; // Annual average local temperature [degrees Celsius], valid range: -273 to 6000 degrees Celsius
    atmos_refract; // Atmospheric refraction at sunrise and sunset (0.5667 deg is typical), valid range: -5 to 5 degrees
    jce; // Julian ephemeris century
    del_psi; // nutation longitude [degrees]
    epsilon; // ecliptic true obliquity [degrees]
    nu; // Greenwich sidereal time [degrees]

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
        this.longitude = longitude;
        this.latitude = latitude;
        this.elevation = elevation;
        this.pressure = pressure;
        this.temperature = temperature;
        this.atmos_refract = atmos_refract;
        this.jce = jce;
        this.del_psi = del_psi;
        this.epsilon = epsilon;
        this.nu = nu;
    }
}
