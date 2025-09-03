import express from "express";
import { deleteUser, getUsers, getUsersByID, postUsers, putUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersByID);
router.post("/:id", postUsers);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

export default router;
