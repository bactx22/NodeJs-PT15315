import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import productRoutes from './routes/product'

dotenv.config();
const app = express();
app.use(bodyParser.json());
//Routes
app.use('/api', productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port ',port)
})