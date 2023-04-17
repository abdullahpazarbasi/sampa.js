import {
    BirdService,
    MpaService,
    SAMPA_ALL,
    SampaInput,
    SampaOutput,
    SampaService,
    SpaService
} from "../../src/sampa/sampa_service.js";

import {expect} from 'chai';

describe('sampa service', () => {
    it('should return valid output', () => {
        // given
        const sampaInput = new SampaInput(
            2009,
            7,
            22,
            1,
            33,
            0,
            0,
            66.4,
            0,
            143.36167,
            24.61167,
            0,
            1000,
            11,
            0,
            0,
            0.5667,
            SAMPA_ALL,
            0.3,
            1.5,
            0.07637,
            0.85,
            0.2
        );
        const sampaOutput = new SampaOutput();
        const s = new SampaService(
            new SpaService(),
            new MpaService(),
            new BirdService()
        );

        // when
        const r = s.calculate(sampaInput, sampaOutput);

        // then
        expect(r).to.equal(0);
        expect(sampaOutput.spaOutput.jd).to.equal(2455034.564583333);
        expect(sampaOutput.spaOutput.l).to.equal(299.4023807109834); // deg.
        expect(sampaOutput.spaOutput.b).to.equal(-0.000013080590842079272); // deg.
        expect(sampaOutput.spaOutput.r).to.equal(1.0160242187566664); // AU
        expect(sampaOutput.spaOutput.h).to.equal(344.99909985181233); // deg.
        expect(sampaOutput.spaOutput.del_psi).to.equal(0.0044411211889926775); // deg.
        expect(sampaOutput.spaOutput.del_epsilon).to.equal(0.0012033113824373887); // deg.
        expect(sampaOutput.spaOutput.epsilon).to.equal(23.43925216757362); // deg.
        expect(sampaOutput.spaOutput.zenith).to.equal(14.51268620956374); // deg.
        expect(sampaOutput.spaOutput.azimuth).to.equal(104.38791674320983); // deg.
        expect(sampaOutput.ems).to.equal(0.37475998417601536); // deg.
        expect(sampaOutput.rs).to.equal(0.2623597784067486); // deg.
        expect(sampaOutput.rm).to.equal(0.2833414569771263); // deg.
        expect(sampaOutput.a_sul_pct).to.equal(78.36351377977174); // percent
        expect(sampaOutput.dni_sul).to.equal(719.0993582629529); // W/m^2
    });
});
