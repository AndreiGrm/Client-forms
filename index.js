const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotte
app.use('/clients', require('./back-end/routes/clientRoutes'));
// Aggiungi altre entità:
app.use('/companies', require('./back-end/routes/companyRoutes'));
app.use('/users', require('./back-end/routes/userRoutes'));
app.use('/accounts', require('./back-end/routes/accountRoutes'));
app.use('/residences', require('./back-end/routes/residenceRoutes'));

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
