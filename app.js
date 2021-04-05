import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import authRoutes from './routes/auth';
import expressValidator from 'express-validator'
import cors from 'cors'
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true
}))
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
app.use(expressValidator());

//Routes
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes)


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port ',port)
})