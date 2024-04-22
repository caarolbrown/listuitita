import { Router } from "express"
import { ListController } from "../controllers/list.controller"

const router: Router = Router()

router.get("/", ListController.getLists)
router.post("/", ListController.createList)
router.get("/:id", ListController.getList)
router.put("/:id", ListController.updateList)
router.delete("/:id", ListController.deleteList)

export default router
