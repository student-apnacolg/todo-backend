const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');

dotenv.config();

const app = express()

connectDB();

app.use(cors({
  origin: ['http://localhost:5173',
    'https://todo-frontend-steel-eight.vercel.app'
  ],
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('✅ API is running');
});

app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
  console.log('server is up and Running at http://localhost:5000')
})