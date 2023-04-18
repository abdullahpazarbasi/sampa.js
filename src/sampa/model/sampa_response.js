export class SampaResponse {
    spaResponse;
    mpaResponse;
    birdResponse;
    ems; //local observed, topocentric, angular distance between sun and moon centers [degrees]
    rs; //radius of sun disk [degrees]
    rm; //radius of moon disk [degrees]
    a_sul; //area of sun's unshaded lune (SUL) during eclipse [degrees squared]
    a_sul_pct; //percent area of SUL during eclipse [percent]
    dni; //estimated direct normal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
    dni_sul; //estimated direct normal solar irradiance from the sun's unshaded lune [W/m^2]
    ghi; //estimated global horizontal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
    ghi_sul; //estimated global horizontal solar irradiance from the sun's unshaded lune [W/m^2]
    dhi; //estimated diffuse horizontal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
    dhi_sul; //estimated diffuse horizontal solar irradiance from the sun's unshaded lune [W/m^2]
}
