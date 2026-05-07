const db = require('../database/db');

async function createPrescription(prescription) {
  const sql = `INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, instructions)
    VALUES (?, ?, ?, ?, ?)`;
  const result = await db.run(sql, [
    prescription.patient_id,
    prescription.doctor_id,
    prescription.medication,
    prescription.dosage,
    prescription.instructions,
  ]);
  return { id: result.lastID, ...prescription };
}

async function getAllPrescriptions() {
  return db.all(
    `SELECT p.*, u_patient.name AS patient_name, u_doctor.name AS doctor_name
     FROM prescriptions p
     JOIN users u_patient ON p.patient_id = u_patient.id
     JOIN users u_doctor ON p.doctor_id = u_doctor.id`
  );
}

async function getPrescriptionById(id) {
  return db.get('SELECT * FROM prescriptions WHERE id = ?', [id]);
}

async function getPrescriptionsByUser(userId) {
  return db.all(
    'SELECT * FROM prescriptions WHERE patient_id = ? OR doctor_id = ?',
    [userId, userId]
  );
}

async function updatePrescription(id, fields) {
  const updates = [];
  const params = [];

  if (fields.medication) {
    updates.push('medication = ?');
    params.push(fields.medication);
  }
  if (fields.dosage) {
    updates.push('dosage = ?');
    params.push(fields.dosage);
  }
  if (fields.instructions) {
    updates.push('instructions = ?');
    params.push(fields.instructions);
  }

  if (!updates.length) {
    return getPrescriptionById(id);
  }

  params.push(id);
  const sql = `UPDATE prescriptions SET ${updates.join(', ')} WHERE id = ?`;
  await db.run(sql, params);
  return getPrescriptionById(id);
}

async function deletePrescription(id) {
  const result = await db.run('DELETE FROM prescriptions WHERE id = ?', [id]);
  return result.changes > 0;
}

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByUser,
  updatePrescription,
  deletePrescription,
};