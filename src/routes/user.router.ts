import { Router } from "express"

const router: Router = Router()

router.get("/", getUsers)
router.post("/", createUser)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router
