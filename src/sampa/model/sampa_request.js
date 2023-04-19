export class SampaRequest {
    year; // gregorian year -- range from -2000 to 6000
    month; // gregorian month -- range from 1 to 12
    day; // gregorian day -- range from 1 to 31
    hour; // observer local hours -- range from 0 to 24
    minute; // observer local minutes -- range from 0 to 59
    second; // observer local seconds -- range from 0 to <60
    delta_ut1; // ΔUT1 = DUT1 = Universal Time (UT) - Coordinated Universal Time (UTC) [seconds] -- range from >-1 to <1
    delta_t; // ΔT = Terrestrial Time (TT) - Universal Time (UT) where ΔT = 32.184 + (TAI-UTC) - DUT1 [seconds] -- range from -8000 to 8000
    timezone; // observer timezone -- range from -18 to 18
    longitude; // observer longitude -- range from -180 to 180
    latitude; // observer latitude -- range from -90 to 90
    elevation; // observer elevation [meters] -- minimum -6500000
    pressure; // annual average local pressure [millibars] -- range from 0 to 5000
    temperature; // annual average local temperature [degrees Celsius] -- range from >-273 to 6000
    slope; // surface slope (measured from the horizontal plane) [degrees] -- range from -360 to 360
    azm_rotation; // surface azimuth rotation (measured from south to projection of surface normal on horizontal plane, negative east) [degrees] -- range from -360 to 360
    atmos_refract; // atmospheric refraction at sunrise and sunset [degrees] -- range from -5 to 5
    function; // Switch to choose functions for desired output (from enumeration)
    bird_ozone; // total column ozone thickness [centimeters] -- range from 0.05 to 0.4
    bird_pwv; // total column water vapor [centimeters] -- range from 0.01 to 6.5
    bird_aod; // broadband aerosol optical depth -- range from 0.02 to 0.5
    bird_ba; // forward scattering factor -- 0.85 recommended for rural aerosols
    bird_albedo; // ground reflectance -- earth typical is 0.2, snow 0.9, vegetation 0.25

    constructor(
        year,
        month,
        day,
        hour,
        minute,
        second,
        timezone,
        delta_ut1,
        delta_t,
        latitude,
        longitude,
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
        this.function = func;
        this.bird_ozone = bird_ozone;
        this.bird_pwv = bird_pwv;
        this.bird_aod = bird_aod;
        this.bird_ba = bird_ba;
        this.bird_albedo = bird_albedo;
    }
}
