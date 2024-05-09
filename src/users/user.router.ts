import { Router } from "express"
import { UserController } from "./user.controller"
import userValidateBody from "./user.validator"

const router: Router = Router()

router.get("/", UserController.getUsers)
router.post("/", userValidateBody, UserController.createUser)
router.get("/:id", UserController.getUser)
router.put("/:id", userValidateBody, UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

export default router
