export class BirdInput {
    zenith;
    r;
    pressure;
    ozone;
    water;
    taua;
    ba;
    albedo;
    dni_mod;

    constructor(
        zenith,
        r,
        pressure,
        ozone,
        water,
        taua,
        ba,
        albedo,
        dni_mod
    ) {
        this.zenith = zenith; //solar zenith angle [degrees] -- available from SPA output
        this.r = r; //earth radius vector [Astronomical Units, AU] -- available from SPA output
        this.pressure = pressure; //annual average local pressure [millibars] -- available from SPA input
        this.ozone = ozone; //total column ozone thickness [cm] -- range from 0.05 - 0.4
        this.water = water; //total column water vapor [cm] -- range from 0.01 - 6.5
        this.taua = taua; //broadband aerosol optical depth -- range from 0.02 - 0.5
        this.ba = ba; //forward scattering factor -- 0.85 recommended for rural aerosols
        this.albedo = albedo; //ground reflectance -- earth typical is 0.2, snow 0.9, vegitation 0.25
        this.dni_mod = dni_mod; //direct normal irradiance modification factor -- optional value from 0.0 - 1.0, which is used to calculate the second set of "modified" irradiance values
    }
}
