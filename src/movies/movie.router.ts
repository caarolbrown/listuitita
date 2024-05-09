import { Router } from "express"
import { MovieController } from "./movie.controller"
import movieValidateBody from "./movie.validator"

const router: Router = Router()

router.get("/", MovieController.getMovies)
router.post("/", movieValidateBody, MovieController.createMovie)
router.get("/:id", MovieController.getMovie)
router.put("/:id", movieValidateBody, MovieController.updateMovie)
router.delete("/:id", MovieController.deleteMovie)

export default router
