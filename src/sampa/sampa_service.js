import {SampaRequest} from "./model/sampa_request.js";
import {SampaResponse} from "./model/sampa_response.js";
import {SPA_ALL, SpaRequest, SpaService} from "../spa/spa_service.js";
import {MpaRequest, MpaService} from "../mpa/mpa_service.js";
import {BirdService, BirdRequest} from "../bird/bird_service.js";
import {deg2rad, rad2deg} from "../common/utils.js";

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
     * @param {SampaRequest} sampaRequest
     * @return {SampaResponse}
     */
    calculate(sampaRequest) {
        const spaRequest = new SpaRequest(
            sampaRequest.year,
            sampaRequest.month,
            sampaRequest.day,
            sampaRequest.hour,
            sampaRequest.minute,
            sampaRequest.second,
            sampaRequest.delta_ut1,
            sampaRequest.delta_t,
            sampaRequest.timezone,
            sampaRequest.longitude,
            sampaRequest.latitude,
            sampaRequest.elevation,
            sampaRequest.pressure,
            sampaRequest.temperature,
            sampaRequest.slope,
            sampaRequest.azm_rotation,
            sampaRequest.atmos_refract,
            SPA_ALL
        );
        const spaResponse = this.spaService.calculate(spaRequest);
        const sampaResponse = new SampaResponse();
        sampaResponse.spaResponse = spaResponse;

        const mpaRequest = new MpaRequest(
            sampaRequest.longitude,
            sampaRequest.latitude,
            sampaRequest.elevation,
            sampaRequest.pressure,
            sampaRequest.temperature,
            sampaRequest.atmos_refract,
            spaResponse.jce,
            spaResponse.del_psi,
            spaResponse.epsilon,
            spaResponse.nu
        );
        const mpaResponse = this.mpaService.calculate(mpaRequest);
        sampaResponse.mpaResponse = mpaResponse;

        sampaResponse.ems = angular_distance_sun_moon(
            spaResponse.zenith,
            spaResponse.azimuth,
            mpaResponse.zenith,
            mpaResponse.azimuth
        );
        sampaResponse.rs = sun_disk_radius(spaResponse.r);
        sampaResponse.rm = moon_disk_radius(mpaResponse.e, mpaResponse.pi, mpaResponse.cap_delta);

        const aSulAndASulPct = sul_area(sampaResponse.ems, sampaResponse.rs, sampaResponse.rm);
        sampaResponse.a_sul = aSulAndASulPct.a_sul;
        sampaResponse.a_sul_pct = aSulAndASulPct.a_sul_pct;

        if (sampaRequest.function === SAMPA_ALL) {
            this.estimate_irr(sampaRequest, sampaResponse);
        }

        return sampaResponse;
    }

    /**
     * Estimate solar irradiances using the SERI/NREL's Bird Clear Sky Model
     *
     * @param {SampaRequest} sampaRequest
     * @param {SampaResponse} sampaResponse
     */
    estimate_irr(sampaRequest, sampaResponse) {
        const birdRequest = new BirdRequest(
            sampaResponse.spaResponse.zenith,
            sampaResponse.spaResponse.r,
            sampaRequest.pressure,
            sampaRequest.bird_ozone,
            sampaRequest.bird_pwv,
            sampaRequest.bird_aod,
            sampaRequest.bird_ba,
            sampaRequest.bird_albedo,
            sampaResponse.a_sul_pct / 100.0
        );

        const birdResponse = this.birdService.calculate(birdRequest);

        sampaResponse.birdResponse = birdResponse;
        sampaResponse.dni = birdResponse.direct_normal;
        sampaResponse.dni_sul = birdResponse.direct_normal_mod;
        sampaResponse.ghi = birdResponse.global_horiz;
        sampaResponse.ghi_sul = birdResponse.global_horiz_mod;
        sampaResponse.dhi = birdResponse.diffuse_horiz;
        sampaResponse.dhi_sul = birdResponse.diffuse_horiz_mod;
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
