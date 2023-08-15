import express from 'express'
import { createDetails, deleteDetails, getAllDetails, getDetails, updateDetails } from '../controllers/CompanyController.js'

const router = express.Router()

router.post('/create', createDetails)
router.get('/:id', getDetails)
router.get('/', getAllDetails)
router.put('/:id', updateDetails)
router.delete('/:id', deleteDetails)

export default router
