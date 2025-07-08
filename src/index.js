const express = require('express');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/project.routes');
const partsRoutes = require('./routes/parts.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Inventory backend up and running');
});

app.use('/projects', projectRoutes);
app.use('/parts', partsRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Database connection failed:', err));
