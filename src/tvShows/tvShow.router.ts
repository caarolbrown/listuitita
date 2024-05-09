import { Router } from "express"
import { TvShowController } from "./tvShow.controller"
import tvShowValidateBody from "./tvShow.validator"

const router: Router = Router()

router.get("/", TvShowController.getTvShows)
router.post("/", tvShowValidateBody, TvShowController.createTvShow)
router.get("/:id", TvShowController.getTvShow)
router.put("/:id", TvShowController.updateTvShow)
router.delete("/:id", TvShowController.deleteTvShow)

export default router
