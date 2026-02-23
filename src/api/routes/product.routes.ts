import { Router } from "express";
const router = Router();

import { validateID } from "../middlewares/middlewares.js";
import { createProduct, 
    getAllProducts, 
    getProductByID, 
    modifyProduct, 
    removeProduct,
    getProductsOfPage,
    getProductsExcel } from "../controllers/product.controllers.js";


////////////////
// READ -> GET

router.get("/", getProductsOfPage);

router.get("/:id", validateID, getProductByID);

router.get("/export/products", getProductsExcel);

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