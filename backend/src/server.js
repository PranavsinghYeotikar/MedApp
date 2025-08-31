import express from "express";
import userRoutes from "./routes/userRoutes.js"
import pharmacyRoutes from "./routes/pharmacyRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

const app = express();
const port = 5000;

app.use('/user', userRoutes);
app.use('/pharmacy', pharmacyRoutes);
app.use('/admin', adminRoutes);

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})