const serverlessExpress = require('serverless-http');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('../src/config/db');
const taskRoutes = require('../src/routes/taskRoutes');

dotenv.config();
const app = express()

connectDB();
app.use(cors({
  origin: 'https://todo-frontend-steel-eight.vercel.app/',
  credentials: true
}))
app.use(express.json())

app.use('/api/tasks', taskRoutes);

app.get('/', (req,res) => {
  res.json({
    success: true
  })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = serverlessExpress(app)