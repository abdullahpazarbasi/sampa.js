export class SampaInput {
    year;
    month;
    day;
    hour;
    minute;
    second;
    delta_ut1;
    delta_t;
    timezone;
    longitude;
    latitude;
    elevation;
    pressure;
    temperature;
    slope;
    azm_rotation;
    atmos_refract;
    function;
    bird_ozone;
    bird_pwv;
    bird_aod;
    bird_ba;
    bird_albedo;

    constructor(
        year,
        month,
        day,
        hour,
        minute,
        second,
        delta_ut1,
        delta_t,
        timezone,
        longitude,
        latitude,
        elevation,
        pressure,
        temperature,
        slope,
        azm_rotation,
        atmos_refract,
        func,
        bird_ozone,
        bird_pwv,
        bird_aod,
        bird_ba,
        bird_albedo
    ) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.delta_ut1 = delta_ut1;
        this.delta_t = delta_t;
        this.timezone = timezone;
        this.longitude = longitude;
        this.latitude = latitude;
        this.elevation = elevation;
        this.pressure = pressure;
        this.temperature = temperature;
        this.slope = slope;
        this.azm_rotation = azm_rotation;
        this.atmos_refract = atmos_refract;
        this.function = func; // Switch to choose functions for desired output (from enumeration)
        this.bird_ozone = bird_ozone; //total column ozone thickness [cm] -- range from 0.05 - 0.4
        this.bird_pwv = bird_pwv; //total column water vapor [cm] -- range from 0.01 - 6.5
        this.bird_aod = bird_aod; //broadband aerosol optical depth -- range from 0.02 - 0.5
        this.bird_ba = bird_ba; //forward scattering factor -- 0.85 recommended for rural aerosols
        this.bird_albedo = bird_albedo; //ground reflectance -- earth typical is 0.2, snow 0.9, vegitation 0.25
    }
}
