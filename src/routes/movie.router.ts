import { Router } from "express"

const router: Router = Router()

router.get("/", getMovies)
router.post("/", createMovie)
router.get("/:id", getMovie)
router.put("/:id", updateMovie)
router.delete("/:id", deleteMovie)

export default router
