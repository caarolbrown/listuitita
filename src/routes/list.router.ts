import { Router } from "express"

const router: Router = Router()

router.get("/", getLists)
router.post("/", createList)
router.get("/:id", getList)
router.put("/:id", updateList)
router.delete("/:id", deleteList)

export default router
