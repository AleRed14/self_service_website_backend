import { Router } from "express";
const router = Router();

import { requiresLogin, validateID } from "../middlewares/middlewares.js";
import { createProduct, 
    getAllProducts, 
    getProductByID, 
    modifyProduct, 
    removeProduct,
    getProductsOfPage,
    getProductsExcel } from "../controllers/product.controllers.js";


////////////////
// READ -> GET

router.get("/export/products", requiresLogin, getProductsExcel);

router.get("/:id", validateID, getProductByID);

router.get("/", getProductsOfPage);

///////////////////
// CREATE -> POST
router.post("/", createProduct);

///////////////////
// UPDATE -> PUT
router.put("/", modifyProduct);

////////////////
// DELETE -> DELETE
router.delete("/:id", validateID, removeProduct);


export default router;