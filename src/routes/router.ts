import { Router } from 'express'
import UserControllers from '../controllers/UserControllers'

const router = Router()

router.get('/', UserControllers.getUsers)
router.post('/', UserControllers.create)
router.delete('/:email', UserControllers.deleteUser)
router.put('/:id', UserControllers.updateUser)

router.post('/login', UserControllers.login)

export default router
