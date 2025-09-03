import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// helper
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "mySecretKey",
    { expiresIn: "1h" }
  );
};

// USER SIGNUP
export const signUpUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, phone, address, role: "user" });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// PHARMACY SIGNUP
export const signUpPharmacy = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashed,
      phone,
      address,
      role: "pharmacy",
      licenseDoc: req.file ? req.file.path : null,
      isVerified: false   // admin will approve later
    });
    await user.save();

    res.status(201).json({ message: "Pharmacy registered, pending verification" });
  } catch (err) {
    res.status(500).json({ message: "Error creating pharmacy" });
  }
};

// ADMIN SIGNUP
export const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: "admin" });
    await user.save();

    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin" });
  }
};

// SIGNIN (common)
export const postSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // check pharmacy verification
    if (user.role === "pharmacy" && !user.isVerified) {
      return res.status(403).json({ message: "Pharmacy not verified yet" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role, message: "Signin successful" });
  } catch (err) {
    res.status(500).json({ message: "Error signing in" });
  }
};
