export class BirdResponse {
    amass; //relative optical airmass (not pressure corrected)
    direct_normal; //direct normal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
    global_horiz; //global horizontal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
    diffuse_horiz; //diffuse horizontal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
    direct_normal_mod; //equivalent to direct_normal * dni_mod
    global_horiz_mod; //re-computed global horizontal based on direct_normal_mod
    diffuse_horiz_mod; //re-computed diffuse horizontal based on direct_normal_mod
}
