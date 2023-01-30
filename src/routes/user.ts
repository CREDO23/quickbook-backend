import { Router } from "express";
import { updateUser, getUser, deleteUser } from "../controllers/user";

const router = Router();

router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUser);

export default router;
