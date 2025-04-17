import { Router } from "express";
import { createUser, getUserById } from "../controllers/userControllers";

const router = Router();

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getUserById);

export default router;
