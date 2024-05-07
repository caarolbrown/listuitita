import { Router } from "express"
import listRouter from "../lists/list.router"
import movieRouter from "../movies/movie.router"
import tvShowRouter from "../tvShows/tvShow.router"
import userRouter from "../users/user.router"

const router = Router()

router.use("/lists", listRouter)
router.use("/movies", movieRouter)
router.use("/tvShows", tvShowRouter)
router.use("/users", userRouter)

export default router 
