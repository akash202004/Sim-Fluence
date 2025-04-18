import { Router } from "express";
import { createUser, getUserById } from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getUserById);

export default router;
