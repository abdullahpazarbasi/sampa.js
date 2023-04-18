import {BirdRequest} from "./model/bird_request.js";
import {BirdResponse} from "./model/bird_response.js";

export class BirdService {
    /**
     * @param {BirdRequest} birdRequest
     * @return {BirdResponse}
     */
    calculate(birdRequest) {
        const birdResponse = new BirdResponse();
        let etrn, press, oz, wat, coszen, taa, rs, ias;
        let t_rayliegh, t_ozone, t_gases, t_water, t_aerosol;

        if ((birdRequest.zenith >= 0) && (birdRequest.zenith < 90) && (birdRequest.r > 0)) {
            etrn = 1367.0 / (birdRequest.r * birdRequest.r);
            coszen = Math.cos(birdRequest.zenith * 3.14159265358979323846264338328 / 180.0);
            birdResponse.amass = 1.0 / (coszen + 0.50572 * ((96.07995 - birdRequest.zenith) ** -1.6364));

            press = birdRequest.pressure * birdResponse.amass / 1013;
            oz = birdRequest.ozone * birdResponse.amass;
            wat = birdRequest.water * birdResponse.amass;

            t_rayliegh = Math.exp(-0.0903 * (press ** 0.84) * (1 + press - (press ** 1.01)));
            t_ozone = 1 - 0.1611 * oz * ((1 + 139.48 * oz) ** -0.3034) - 0.002715 * oz / (1 + 0.044 * oz + 0.0003 * (oz ** 2));
            t_gases = Math.exp(-0.0127 * (press ** 0.26));
            t_water = 1 - 2.4959 * wat / ((1 + 79.034 * wat) ** 0.6828 + 6.385 * wat);
            t_aerosol = Math.exp(-((birdRequest.taua ** 0.873)) * (1 + birdRequest.taua - (birdRequest.taua ** 0.7088)) * (birdResponse.amass ** 0.9108));

            birdResponse.direct_normal = 0.9662 * etrn * t_aerosol * t_water * t_gases * t_ozone * t_rayliegh;
            if (birdResponse.direct_normal < 0) {
                birdResponse.direct_normal = 0;
            }

            taa = 1 - 0.1 * (1 - birdResponse.amass + (birdResponse.amass ** 1.06)) * (1 - t_aerosol);
            rs = 0.0685 + (1 - birdRequest.ba) * (1 - t_aerosol / taa);
            ias = etrn * coszen * 0.79 * t_ozone * t_gases * t_water * taa * (0.5 * (1 - t_rayliegh) + birdRequest.ba * (1 - (t_aerosol / taa))) / (1 - birdResponse.amass + (birdResponse.amass ** 1.02));

            let ghiAndDhi = this.horiz(birdResponse.direct_normal, coszen, ias, birdRequest.albedo, rs);
            birdResponse.global_horiz = ghiAndDhi.ghi;
            birdResponse.diffuse_horiz = ghiAndDhi.dhi;
            if (birdRequest.dni_mod >= 0) {
                birdResponse.direct_normal_mod = birdResponse.direct_normal * birdRequest.dni_mod;
                ghiAndDhi = this.horiz(birdResponse.direct_normal_mod, coszen, ias, birdRequest.albedo, rs);
                birdResponse.global_horiz_mod = ghiAndDhi.ghi;
                birdResponse.diffuse_horiz_mod = ghiAndDhi.dhi;
            }
        } else {
            birdResponse.amass = birdResponse.direct_normal = birdResponse.global_horiz = birdResponse.diffuse_horiz = 0;
            birdResponse.direct_normal_mod = birdResponse.global_horiz_mod = birdResponse.diffuse_horiz_mod = 0;
        }

        return birdResponse;
    }

    horiz(dni, coszen, ias, albedo, rs) {
        let dir_horz = dni * coszen;
        let ghi, dhi;

        if (albedo * rs !== 1.0) {
            ghi = (dir_horz + ias) / (1.0 - albedo * rs);
            if (ghi < 0) {
                ghi = 0;
            }
        } else {
            ghi = 0;
        }

        dhi = ghi - dir_horz;
        if (dhi < 0) {
            dhi = 0;
        }

        return {ghi: ghi, dhi: dhi};
    }
}

export {BirdRequest, BirdResponse};
