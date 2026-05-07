const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'HealthTech Prescription System API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});