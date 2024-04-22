import { Router } from "express"
import { MovieController } from "../controllers/movie.controller"

const router: Router = Router()

router.get("/", MovieController.getMovies)
router.post("/", MovieController.createMovie)
router.get("/:id", MovieController.getMovie)
router.put("/:id", MovieController.updateMovie)
router.delete("/:id", MovieController.deleteMovie)

export default router
