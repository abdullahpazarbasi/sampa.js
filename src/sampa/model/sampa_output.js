export class SampaOutput {
    spaOutput;
    mpaOutput;
    birdOutput;
    ems;
    rs;
    rm;
    a_sul;
    a_sul_pct;
    dni;
    dni_sul;
    ghi;
    ghi_sul;
    dhi;
    dhi_sul;

    /**
     * @param {SpaOutput} spaOutput
     * @param {MpaOutput} mpaOutput
     * @param {BirdOutput} birdOutput
     * @param ems
     * @param rs
     * @param rm
     * @param a_sul
     * @param a_sul_pct
     * @param dni
     * @param dni_sul
     * @param ghi
     * @param ghi_sul
     * @param dhi
     * @param dhi_sul
     */
    constructor(
        spaOutput,
        mpaOutput,
        birdOutput,
        ems,
        rs,
        rm,
        a_sul,
        a_sul_pct,
        dni,
        dni_sul,
        ghi,
        ghi_sul,
        dhi,
        dhi_sul
    ) {
        this.spaOutput = spaOutput;
        this.mpaOutput = mpaOutput;
        this.birdOutput = birdOutput;
        this.ems = ems; //local observed, topocentric, angular distance between sun and moon centers [degrees]
        this.rs = rs; //radius of sun disk [degrees]
        this.rm = rm; //radius of moon disk [degrees]

        this.a_sul = a_sul; //area of sun's unshaded lune (SUL) during eclipse [degrees squared]
        this.a_sul_pct = a_sul_pct; //percent area of SUL during eclipse [percent]

        this.dni = dni; //estimated direct normal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
        this.dni_sul = dni_sul; //estimated direct normal solar irradiance from the sun's unshaded lune [W/m^2]

        this.ghi = ghi; //estimated global horizontal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
        this.ghi_sul = ghi_sul; //estimated global horizontal solar irradiance from the sun's unshaded lune [W/m^2]

        this.dhi = dhi; //estimated diffuse horizontal solar irradiance using SERI/NREL Bird Clear Sky Model [W/m^2]
        this.dhi_sul = dhi_sul; //estimated diffuse horizontal solar irradiance from the sun's unshaded lune [W/m^2]
    }
}
