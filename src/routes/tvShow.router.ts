import { Router } from "express"
import { TvShowController } from "../controllers/tvShow.controller"

const router: Router = Router()

router.get("/", TvShowController.getTvShows)
router.post("/", TvShowController.createTvShow)
router.get("/:id", TvShowController.getTvShow)
router.put("/:id", TvShowController.updateTvShow)
router.delete("/:id", TvShowController.deleteTvShow)

export default router
