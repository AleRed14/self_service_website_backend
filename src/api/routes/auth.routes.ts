import { Router } from "express";
const router = Router();

import { loginController, logoutController } from "../controllers/auth.controllers.js";

router.post("/login", loginController);

router.post("/logout", logoutController);

export default router;