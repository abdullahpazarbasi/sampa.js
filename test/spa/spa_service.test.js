import {SpaService, SpaInput, SpaOutput, SPA_ALL} from '../../src/spa/spa_service.js';
import {expect} from 'chai';
import {convertFractionalHourToClockNotation} from "../../src/utils/utils.js";

describe('spa service', () => {
    it('should return valid output', () => {
        // given
        const spaInput = new SpaInput(
            2003,
            10,
            17,
            12,
            30,
            30,
            0,
            67,
            -7.0,
            -105.1786,
            39.742476,
            1830.14,
            820,
            11,
            30,
            -10,
            0.5667,
            SPA_ALL
        );
        const spaOutput = new SpaOutput();
        const s = new SpaService();

        // when
        const r = s.calculate(spaInput, spaOutput);

        // then
        expect(r).to.equal(0);
        expect(spaOutput.jd).to.equal(2452930.312847222);
        expect(spaOutput.l).to.equal(24.0182616916794); // deg.
        expect(spaOutput.b).to.equal(-0.00010112192480034237); // deg.
        expect(spaOutput.r).to.equal(0.9965422973539708); // AU
        expect(spaOutput.h).to.equal(11.105902013913436); // deg.
        expect(spaOutput.del_psi).to.equal(-0.003998404303332777); // deg.
        expect(spaOutput.del_epsilon).to.equal(0.0016665681772496856); // deg.
        expect(spaOutput.epsilon).to.equal(23.440464519617525); // deg.
        expect(spaOutput.zenith).to.equal(50.11162202402972); // deg.
        expect(spaOutput.azimuth).to.equal(194.34024051019162); // deg.
        expect(spaOutput.incidence).to.equal(25.18700020035314); // deg.
        expect(spaOutput.sunrise).to.equal(6.212066609284621);
        const sunriseTime = convertFractionalHourToClockNotation(spaOutput.sunrise);
        expect(sunriseTime).to.equal('06:12:43');
        expect(spaOutput.sunset).to.equal(17.338666514441748);
        const sunsetTime = convertFractionalHourToClockNotation(spaOutput.sunset);
        expect(sunsetTime).to.equal('17:20:19');
    });
});