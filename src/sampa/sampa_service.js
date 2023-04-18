import {SampaRequest} from "./model/sampa_request.js";
import {SampaResponse} from "./model/sampa_response.js";
import {SPA_ZA, SpaRequest, SpaResponse, SpaService} from "../spa/spa_service.js";
import {MpaInput, MpaOutput, MpaService} from "../mpa/mpa_service.js";
import {BirdService, BirdInput, BirdOutput} from "../bird/bird_service.js";
import {deg2rad, rad2deg} from "../utils/utils.js";

export const SAMPA_NO_IRR = 0;
export const SAMPA_ALL = 1;

export class SampaService {
    /**
     * @param {SpaService} spaService
     * @param {MpaService} mpaService
     * @param {BirdService} birdService
     */
    constructor(spaService, mpaService, birdService) {
        this.spaService = spaService;
        this.mpaService = mpaService;
        this.birdService = birdService;
    }

    /**
     * Calculate all SAMPA parameters and put into structure
     * Note: All inputs values (listed in SPA header file) must already be in structure
     *
     * @param {SampaRequest} sampaInput
     * @param {SampaResponse} sampaOutput
     */
    calculate(sampaInput, sampaOutput) {
        const spaInput = new SpaRequest(
            sampaInput.year,
            sampaInput.month,
            sampaInput.day,
            sampaInput.hour,
            sampaInput.minute,
            sampaInput.second,
            sampaInput.delta_ut1,
            sampaInput.delta_t,
            sampaInput.timezone,
            sampaInput.longitude,
            sampaInput.latitude,
            sampaInput.elevation,
            sampaInput.pressure,
            sampaInput.temperature,
            sampaInput.slope,
            sampaInput.azm_rotation,
            sampaInput.atmos_refract,
            SPA_ZA
        );
        const spaOutput = new SpaResponse();
        const result = this.spaService.calculate(spaInput, spaOutput);
        if (result === 0) {
            sampaOutput.spaResponse = spaOutput;
            const mpaInput = new MpaInput(
                sampaInput.longitude,
                sampaInput.latitude,
                sampaInput.elevation,
                sampaInput.pressure,
                sampaInput.temperature,
                sampaInput.atmos_refract,
                spaOutput.jce,
                spaOutput.del_psi,
                spaOutput.epsilon,
                spaOutput.nu
            );
            const mpaOutput = new MpaOutput();
            this.mpaService.calculate(mpaInput, mpaOutput);
            sampaOutput.mpaResponse = mpaOutput;

            sampaOutput.ems = angular_distance_sun_moon(
                spaOutput.zenith,
                spaOutput.azimuth,
                mpaOutput.zenith,
                mpaOutput.azimuth
            );
            sampaOutput.rs = sun_disk_radius(spaOutput.r);
            sampaOutput.rm = moon_disk_radius(mpaOutput.e, mpaOutput.pi, mpaOutput.cap_delta);

            const aSulAndASulPct = sul_area(sampaOutput.ems, sampaOutput.rs, sampaOutput.rm);
            sampaOutput.a_sul = aSulAndASulPct.a_sul;
            sampaOutput.a_sul_pct = aSulAndASulPct.a_sul_pct;

            if (sampaInput.function === SAMPA_ALL) {
                this.estimate_irr(sampaInput, sampaOutput);
            }
        }

        return result;
    }

    /**
     * Estimate solar irradiances using the SERI/NREL's Bird Clear Sky Model
     *
     * @param {SampaRequest} sampaInput
     * @param {SampaResponse} sampaOutput
     */
    estimate_irr(sampaInput, sampaOutput) {
        const birdInput = new BirdInput(
            sampaOutput.spaResponse.zenith,
            sampaOutput.spaResponse.r,
            sampaInput.pressure,
            sampaInput.bird_ozone,
            sampaInput.bird_pwv,
            sampaInput.bird_aod,
            sampaInput.bird_ba,
            sampaInput.bird_albedo,
            sampaOutput.a_sul_pct / 100.0
        );
        const birdOutput = new BirdOutput();

        this.birdService.calculate(birdInput, birdOutput);

        sampaOutput.birdResponse = birdOutput;
        sampaOutput.dni = birdOutput.direct_normal;
        sampaOutput.dni_sul = birdOutput.direct_normal_mod;
        sampaOutput.ghi = birdOutput.global_horiz;
        sampaOutput.ghi_sul = birdOutput.global_horiz_mod;
        sampaOutput.dhi = birdOutput.diffuse_horiz;
        sampaOutput.dhi_sul = birdOutput.diffuse_horiz_mod;
    }
}

function angular_distance_sun_moon(zen_sun, azm_sun, zen_moon, azm_moon) {
    const zs = deg2rad(zen_sun);
    const zm = deg2rad(zen_moon);

    return rad2deg(Math.acos(Math.cos(zs) * Math.cos(zm) + Math.sin(zs) * Math.sin(zm) * Math.cos(deg2rad(azm_sun - azm_moon))));
}

function sun_disk_radius(r) {
    return 959.63 / (3600.0 * r);
}

function moon_disk_radius(e, pi, cap_delta) {
    return 358473400 * (1 + Math.sin(deg2rad(e)) * Math.sin(deg2rad(pi))) / (3600.0 * cap_delta);
}

function sul_area(ems, rs, rm) {
    const ems2 = ems * ems;
    const rs2 = rs * rs;
    const rm2 = rm * rm;
    let snum, ai, m, s, h;

    if (ems < rs + rm) {
        if (ems <= Math.abs(rs - rm)) {
            ai = Math.PI * rm2;
        } else {
            snum = ems2 + rs2 - rm2;
            m = (ems2 - rs2 + rm2) / (2 * ems);
            s = snum / (2 * ems);
            h = Math.sqrt(4 * ems2 * rs2 - snum * snum) / (2 * ems);
            ai = rs2 * Math.acos(s / rs) - h * s + rm2 * Math.acos(m / rm) - h * m;
        }
    } else {
        ai = 0;
    }

    const a_sul = Math.PI * rs2 - ai;
    const a_sul_pct = a_sul < 0 ? 0 : (a_sul * 100) / (Math.PI * rs2);

    return {a_sul: a_sul, a_sul_pct: a_sul_pct};
}

export {SampaRequest, SampaResponse, SpaService, MpaService, BirdService};
