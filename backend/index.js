import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import details from './routes/routes.js'

const app = express()

//middleware
app.use(express.json())

dotenv.config()

//mongo db connection
mongoose.connect(process.env.DB, {
    useNewUrlParser:true
}).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at port ${process.env.PORT}`)))
.catch((error)=>console.log(error))

//accessing routes
app.use('/details', details)