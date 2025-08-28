const express = require('express');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/project.routes');
const partsRoutes = require('./routes/parts.routes');
const manufacturerPartRoutes = require('./routes/manufacturerPart.routes');
const partReceiptRoutes = require('./routes/partReceipt.routes');
const receiptLocationRoutes = require('./routes/receiptLocation.routes');
const projectPartUsageRoutes = require('./routes/projectPartUsage.routes');
const stockAdjustmentRoutes = require('./routes/stockAdjustment.routes');
const stockRoutes = require('./routes/stock.routes');
const alternatePartRoutes = require('./routes/alternatePart.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Inventory backend up and running');
});

app.use('/projects', projectRoutes);
app.use('/parts', partsRoutes);
app.use('/manufacturer-parts', manufacturerPartRoutes);
app.use('/receipts', partReceiptRoutes);
app.use('/receipt-locations', receiptLocationRoutes);
app.use('/usages', projectPartUsageRoutes);
// app.use('/adjustments', stockAdjustmentRoutes);
app.use('/stock-adjustments', stockAdjustmentRoutes);
app.use('/stock', stockRoutes);
app.use('/alternate-parts', alternatePartRoutes);
app.use('/auth', authRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');

    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://13.127.33.167:${PORT}`));
  })
  .catch(err => console.error('Database connection failed:', err));

 // for browser connection CORS is needed
const cors = require('cors');

app.use(cors({
  origin: '*', // or restrict to your web host: 'http://localhost:8080'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
