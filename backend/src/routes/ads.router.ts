import {Router} from "express";

const routerAds = Router();
import { AdsController } from "../controller/Ads";

const adsController = new AdsController();
routerAds.get("/", adsController.getAll);
routerAds.get("/:id", adsController.getOne);
routerAds.post("/", adsController.createOne);
routerAds.delete("/:id", adsController.deleteOne);
routerAds.patch("/:id", adsController.patchOne);
routerAds.put("/:id", adsController.updateOne);

export default routerAds