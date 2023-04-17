import {BirdInput} from "./model/bird_input.js";
import {BirdOutput} from "./model/bird_output.js";

export class BirdService {
    /**
     * @param {BirdInput} birdInput
     * @param {BirdOutput} birdOutput
     */
    calculate(birdInput, birdOutput) {
        let etrn, press, oz, wat, coszen, taa, rs, ias;
        let t_rayliegh, t_ozone, t_gases, t_water, t_aerosol;

        if ((birdInput.zenith >= 0) && (birdInput.zenith < 90) && (birdInput.r > 0)) {
            etrn = 1367.0 / (birdInput.r * birdInput.r);
            coszen = Math.cos(birdInput.zenith * 3.14159265358979323846264338328 / 180.0);
            birdOutput.amass = 1.0 / (coszen + 0.50572 * ((96.07995 - birdInput.zenith) ** -1.6364));

            press = birdInput.pressure * birdOutput.amass / 1013;
            oz = birdInput.ozone * birdOutput.amass;
            wat = birdInput.water * birdOutput.amass;

            t_rayliegh = Math.exp(-0.0903 * (press ** 0.84) * (1 + press - (press ** 1.01)));
            t_ozone = 1 - 0.1611 * oz * ((1 + 139.48 * oz) ** -0.3034) - 0.002715 * oz / (1 + 0.044 * oz + 0.0003 * (oz ** 2));
            t_gases = Math.exp(-0.0127 * (press ** 0.26));
            t_water = 1 - 2.4959 * wat / ((1 + 79.034 * wat) ** 0.6828 + 6.385 * wat);
            t_aerosol = Math.exp(-((birdInput.taua ** 0.873)) * (1 + birdInput.taua - (birdInput.taua ** 0.7088)) * (birdOutput.amass ** 0.9108));

            birdOutput.direct_normal = 0.9662 * etrn * t_aerosol * t_water * t_gases * t_ozone * t_rayliegh;
            if (birdOutput.direct_normal < 0) {
                birdOutput.direct_normal = 0;
            }

            taa = 1 - 0.1 * (1 - birdOutput.amass + (birdOutput.amass ** 1.06)) * (1 - t_aerosol);
            rs = 0.0685 + (1 - birdInput.ba) * (1 - t_aerosol / taa);
            ias = etrn * coszen * 0.79 * t_ozone * t_gases * t_water * taa * (0.5 * (1 - t_rayliegh) + birdInput.ba * (1 - (t_aerosol / taa))) / (1 - birdOutput.amass + (birdOutput.amass ** 1.02));

            let ghiAndDhi = this.horiz(birdOutput.direct_normal, coszen, ias, birdInput.albedo, rs);
            birdOutput.global_horiz = ghiAndDhi.ghi;
            birdOutput.diffuse_horiz = ghiAndDhi.dhi;
            if (birdInput.dni_mod >= 0) {
                birdOutput.direct_normal_mod = birdOutput.direct_normal * birdInput.dni_mod;
                ghiAndDhi = this.horiz(birdOutput.direct_normal_mod, coszen, ias, birdInput.albedo, rs);
                birdOutput.global_horiz_mod = ghiAndDhi.ghi;
                birdOutput.diffuse_horiz_mod = ghiAndDhi.dhi;
            }
        } else {
            birdOutput.amass = birdOutput.direct_normal = birdOutput.global_horiz = birdOutput.diffuse_horiz = 0;
            birdOutput.direct_normal_mod = birdOutput.global_horiz_mod = birdOutput.diffuse_horiz_mod = 0;
        }
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

export {BirdInput, BirdOutput};
