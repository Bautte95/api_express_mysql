import { Router } from "express";
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/users";
import { validateId, validateUserBody } from "../middlewares/validationMiddleware";


const router = Router();

router.get('/', getUsers)
router.get('/:id', validateId, getUser)
router.post('/', validateUserBody, postUser)
router.put('/:id', validateId, putUser)
router.delete('/:id', validateId, deleteUser)

export default router;