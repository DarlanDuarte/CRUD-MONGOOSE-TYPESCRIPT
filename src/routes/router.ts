import { Router } from 'express'
import UserControllers from '../controllers/UserControllers'

const router = Router()

router.get('/', UserControllers.getUser)
router.post('/', UserControllers.create)

export default router
