
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'patient',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  medication TEXT NOT NULL,
  dosage TEXT NOT NULL,
  instructions TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (name, email, password, role)
VALUES ('Dr. Sumith Shetty', 'Sumithshetty@gmail.com', 'password123', 'doctor');

INSERT INTO users (name, email, password, role)
VALUES ('Dr. Uday Shankar', 'ShankarUday@gmail.com', 'Kiran111', 'admin');

INSERT INTO users (name, email, password, role)
VALUES ('Praveen rao', 'praveenRao@gmail.com', 'praveen123', 'patient');

SELECT * FROM users;

SELECT * FROM users
WHERE role = 'doctor';

SELECT * FROM users
WHERE role = 'patient';

INSERT INTO prescriptions (
  patient_id,
  doctor_id,
  medication,
  dosage,
  instructions
) VALUES (
  3,
  2,
  'Paracetamol 650mg',
  '1 tablet twice daily',
  'Take after food for 5 days'
);

INSERT INTO prescriptions (
  patient_id,
  doctor_id,
  medication,
  dosage,
  instructions
) VALUES (
  3,
  2,
  'Vitamin C',
  '1 tablet daily',
  'Take every morning'
);

SELECT
  p.id,
  patient.name AS patient_name,
  doctor.name AS doctor_name,
  p.medication,
  p.dosage,
  p.instructions,
  p.created_at,
  p.updated_at
FROM prescriptions p
JOIN users patient ON p.patient_id = patient.id
JOIN users doctor ON p.doctor_id = doctor.id;

SELECT
  p.id,
  patient.name AS patient_name,
  doctor.name AS doctor_name,
  p.medication,
  p.dosage,
  p.instructions
FROM prescriptions p
JOIN users patient ON p.patient_id = patient.id
JOIN users doctor ON p.doctor_id = doctor.id
WHERE p.id = 1;

SELECT * FROM prescriptions
WHERE patient_id = 3;

UPDATE prescriptions
SET
  medication = 'Paracetamol 650mg',
  dosage = '1 tablet three times daily',
  instructions = 'Take after breakfast, lunch, dinner',
  updated_at = datetime('now')
WHERE id = 1;

DELETE FROM prescriptions
WHERE id = 2;