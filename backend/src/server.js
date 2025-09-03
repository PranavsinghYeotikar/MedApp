import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js"
// import adminRoutes from "./routes/adminRoutes.js"

import prescriptionRoutes from "./routes/prescriptionRoutes.js"



dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); // important for parsing JSON bodies

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/pharmacy', pharmacyRoutes);
// app.use('/admin', adminRoutes);

app.use("/prescriptions", prescriptionRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
});
