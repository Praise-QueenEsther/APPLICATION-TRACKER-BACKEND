require("dotenv").config()
const express =require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const {HOST,PORT=3400}=process.env;

const app= express()
app.use(cors())
app.use(express.json())

const userRoutes=require("./routes/userRoute");
app.use('/', userRoutes);
// const loginRouter=require("./routes/loginRoutes");
// app.use('/login', loginRouter)


app.listen(PORT, ()=>{
    mongoose.connect(HOST).then(()=>{
        console.log(`db connected`)
    }).catch(err=>{
        console.log(`db connection error`,err)
    })
    console.log(`app running on ${PORT}`)
})