import { Router } from "express";
import { getSalesExcel } from "../controllers/sale.controllers.js";

const router = Router();

router.get("/export/sales", getSalesExcel);

export default router;