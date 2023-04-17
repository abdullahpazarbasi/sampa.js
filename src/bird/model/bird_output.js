export class BirdOutput {
    amass;
    direct_normal;
    global_horiz;
    diffuse_horiz;
    direct_normal_mod;
    global_horiz_mod;
    diffuse_horiz_mod;

    constructor(
        amass,
        direct_normal,
        global_horiz,
        diffuse_horiz,
        direct_normal_mod,
        global_horiz_mod,
        diffuse_horiz_mod
    ) {
        this.amass = amass; //relative optical airmass (not pressure corrected)
        this.direct_normal = direct_normal; //direct normal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
        this.global_horiz = global_horiz; //global horizontal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
        this.diffuse_horiz = diffuse_horiz; //diffuse horizontal solar irradiance [W/m^2] -- Bird Clear Sky Estimated
        this.direct_normal_mod = direct_normal_mod; //equivalent to direct_normal * dni_mod
        this.global_horiz_mod = global_horiz_mod; //re-computed global horizontal based on direct_normal_mod
        this.diffuse_horiz_mod = diffuse_horiz_mod; //re-computed diffuse horizontal based on direct_normal_mod
    }
}
