export class BirdRequest {
    zenith; //solar zenith angle [degrees] -- available from SPA output
    r; //earth radius vector [Astronomical Units, AU] -- available from SPA output
    pressure; //annual average local pressure [millibars] -- available from SPA input
    ozone; //total column ozone thickness [cm] -- range from 0.05 - 0.4
    water; //total column water vapor [cm] -- range from 0.01 - 6.5
    taua; //broadband aerosol optical depth -- range from 0.02 - 0.5
    ba; //forward scattering factor -- 0.85 recommended for rural aerosols
    albedo; //ground reflectance -- earth typical is 0.2, snow 0.9, vegitation 0.25
    dni_mod; //direct normal irradiance modification factor -- optional value from 0.0 - 1.0, which is used to calculate the second set of "modified" irradiance values

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
        this.zenith = zenith;
        this.r = r;
        this.pressure = pressure;
        this.ozone = ozone;
        this.water = water;
        this.taua = taua;
        this.ba = ba;
        this.albedo = albedo;
        this.dni_mod = dni_mod;
    }
}
