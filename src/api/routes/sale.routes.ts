import { Router } from "express";
import { getSalesExcel, insertProductSale} from "../controllers/sale.controllers.js";
import { requiresLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get("/export/sales", requiresLogin, getSalesExcel);

router.post("/api/sales", insertProductSale);

export default router;