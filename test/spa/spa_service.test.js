import {SpaService, SpaRequest, SPA_ALL} from '../../src/spa/spa_service.js';
import {convertFractionalHourToClockNotation} from "../../src/common/utils.js";

import {expect} from 'chai';

describe('spa service', () => {
    it('should return valid output', () => {
        // given
        const spaRequest = new SpaRequest(
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
        const s = new SpaService();

        // when
        const spaResponse = s.calculate(spaRequest);

        // then
        expect(spaResponse.jd).to.equal(2452930.312847222);
        expect(spaResponse.l).to.equal(24.0182616916794); // deg.
        expect(spaResponse.b).to.equal(-0.00010112192480034237); // deg.
        expect(spaResponse.r).to.equal(0.9965422973539708); // AU
        expect(spaResponse.h).to.equal(11.105902013913465); // deg.
        expect(spaResponse.del_psi).to.equal(-0.003998404303332777); // deg.
        expect(spaResponse.del_epsilon).to.equal(0.0016665681772496856); // deg.
        expect(spaResponse.epsilon).to.equal(23.440464519617525); // deg.
        expect(spaResponse.zenith).to.equal(50.11162202402972); // deg.
        expect(spaResponse.azimuth).to.equal(194.34024051019165); // deg.
        expect(spaResponse.incidence).to.equal(25.18700020035315); // deg.
        expect(spaResponse.sunrise).to.equal(6.212066609284621);
        const sunriseTime = convertFractionalHourToClockNotation(spaResponse.sunrise);
        expect(sunriseTime).to.equal('06:12:43');
        expect(spaResponse.sunset).to.equal(17.338666514441748);
        const sunsetTime = convertFractionalHourToClockNotation(spaResponse.sunset);
        expect(sunsetTime).to.equal('17:20:19');
    });
});