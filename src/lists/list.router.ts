import { Router } from "express"
import { ListController } from "./list.controller"
import listValidateBody from "./list.validator"

const router: Router = Router()

router.get("/", ListController.getLists)
router.post("/", listValidateBody, ListController.createList)
router.get("/:id", ListController.getList)
router.put("/:id", listValidateBody, ListController.updateList)
router.delete("/:id", ListController.deleteList)

export default router
