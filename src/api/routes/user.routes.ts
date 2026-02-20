import { Router } from "express";
import { insertUser } from "../controllers/user.controllers.ts";

const router = Router();

router.post("/", insertUser);

export default router;