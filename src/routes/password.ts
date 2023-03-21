import { Router } from "express";
import { forgotPassword } from "../controllers/password";

const router = Router();

router.post("/forgot", forgotPassword);

export default router;
