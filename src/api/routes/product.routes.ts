import { Router } from "express";
const router = Router();

import { validateID } from "../middlewares/middlewares.ts";
import { createProduct, 
    getAllProducts, 
    getProductByID, 
    modifyProduct, 
    removeProduct,
    getProductsOfPage } from "../controllers/product.controllers.ts";


////////////////
// READ -> GET

router.get("/", getProductsOfPage);

router.get("/:id", validateID, getProductByID);

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