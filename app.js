import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import productRoutes from './routes/product'

dotenv.config();
const app = express();
app.use(bodyParser.json());

//connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Data connected');
});

mongoose.connection.on('Error', err => {
    console.log(`Data failed, ${err.message}`)
})

//Routes
app.use('/api', productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port ',port)
})