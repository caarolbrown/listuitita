import { Router } from "express"
import listRouter from "./list.router"

const router = Router()

router.use('/lists', listRouter)

export default router 