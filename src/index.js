import {BirdService, MpaService, SampaService, SpaService} from "./sampa/sampa_service.js";

const sampaJs = new SampaService(
    new SpaService(),
    new MpaService(),
    new BirdService()
);
