import {
    SAMPA_NO_IRR,
    SAMPA_ALL,
    SampaRequest,
    SampaResponse,
    BirdService,
    MpaService,
    SampaService,
    SpaService
} from "./sampa/sampa_service.js";

function createSampaService() {
    return new SampaService(
        new SpaService(),
        new MpaService(),
        new BirdService()
    );
}

export {SAMPA_NO_IRR, SAMPA_ALL, SampaRequest, SampaResponse, createSampaService};
