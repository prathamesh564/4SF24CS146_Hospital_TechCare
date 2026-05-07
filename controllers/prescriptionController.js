const prescriptionModel = require('../models/prescriptionModel');

async function createPrescription(req, res) {
  try {
    const { patient_id, medication, dosage, instructions } = req.body;
    const doctor_id = req.user.id;

    if (!patient_id || !medication || !dosage) {
      return res.status(400).json({ message: 'patient_id, medication, and dosage are required.' });
    }

    const prescription = await prescriptionModel.createPrescription({
      patient_id,
      doctor_id,
      medication,
      dosage,
      instructions: instructions || '',
    });

    res.status(201).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create prescription.' });
  }
}

async function listPrescriptions(req, res) {
  try {
    const prescriptions = await prescriptionModel.getAllPrescriptions();
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve prescriptions.' });
  }
}

async function getPrescription(req, res) {
  try {
    const { id } = req.params;
    const prescription = await prescriptionModel.getPrescriptionById(id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found.' });
    }
    res.json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve prescription.' });
  }
}

async function updatePrescription(req, res) {
  try {
    const { id } = req.params;
    const updated = await prescriptionModel.updatePrescription(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Prescription not found.' });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update prescription.' });
  }
}

async function deletePrescription(req, res) {
  try {
    const { id } = req.params;
    const deleted = await prescriptionModel.deletePrescription(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Prescription not found.' });
    }
    res.json({ message: 'Prescription deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete prescription.' });
  }
}

module.exports = {
  createPrescription,
  listPrescriptions,
  getPrescription,
  updatePrescription,
  deletePrescription,
};