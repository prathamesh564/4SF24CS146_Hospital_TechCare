const express = require('express');
const {
  createPrescription,
  listPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
} = require('../controllers/prescriptionController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['doctor', 'admin', 'patient']), listPrescriptions);
router.post('/', authorize(['doctor', 'admin']), createPrescription);
router.get('/:id', authorize(['doctor', 'admin', 'patient']), getPrescription);
router.put('/:id', authorize(['doctor', 'admin']), updatePrescription);
router.delete('/:id', authorize(['admin']), deletePrescription);

module.exports = router;