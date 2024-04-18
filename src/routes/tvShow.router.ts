import { Router } from "express"

const router: Router = Router()

router.get("/", getTvShows)
router.post("/", createTvShow)
router.get("/:id", getTvShow)
router.put("/:id", updateTvShow)
router.delete("/:id", deleteTvShow)

export default router
