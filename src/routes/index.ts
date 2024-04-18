import { Router } from "express"
import listRouter from "./list.router"
import movieRouter from "./movie.router"
import tvShowRouter from "./tvShow.router"
import userRouter from "./user.router"

const router = Router()

router.use("/lists", listRouter)
router.use("/movies", movieRouter)
router.use("/tvShows", tvShowRouter)
router.use("/users", userRouter)

export default router 
