const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

app.get('/', (req,res) => {
  res.send('API running...')
})

app.listen(PORT, () => {
  console.log(`Server up and Running at http:localhost:${PORT}`)
})