import ProductModels from "../models/product.models.ts";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        
        const [rows] = await ProductModels.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No products found" : "Products found"
        });
        
    } catch (error) {
        console.error("Error obtaining products", error);
        
        res.status(500).json({
            message: "Internal error obtaining products"
        });
    }
}

export const getProductByID = async (req: Request<{ id: string}>, res: Response) => {
    try {
        
        let { id } = req.params;

        const [rows] = await ProductModels.selectProductWhereId(id);

        if(rows.length === 0){
            console.log("Error, no product with that ID exists.");
            
            res.status(404).json({
                message: `No find product with that ID ${id}`
            });
        };

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error obtaining product id", error.message);
        } else {
            console.error("Error obtaining product id", error);
        };
        
        res.status(500).json({
            error: "Internal error obtaining products with id"
        });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        
        const { name, image, category, price } = req.body;

        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: "Invalid data, please ensure you complete all fields on the form."
            });
        };

        let [result] = await ProductModels.insertProduct(name, image, category, price);

        res.status(201).json({
            message: "Product successfully created",
            productID: result.insertId
        })
    } catch (error) {
        console.error("Internal server error");

        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
}

export const modifyProduct = async (req: Request, res: Response) => {
    try {
        
        let { id, name, image, category, price, active } = req.body;

        if(!id || !name || !category || !price || !active) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

        let [result] = await ProductModels.updateProduct(name, image, price, category, active, id);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "The product was not updated"
            });
        }

        res.status(200).json({
            message: "Product successfully updated"
        });
    } catch (error) {
        console.error("Error updating the product: ", error);

        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            })
        };
    }
}

export const removeProduct = async (req: Request<{ id: string}>, res: Response) => {
    
    let { id } = req.params;

    try {
        

        let [result] = await ProductModels.deleteProduct(id);
        
        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `Not find product with id ${id}`
            });
        }


        return res.status(200).json({
            message: `Product with id ${id} successfully deleted`
        });


    } catch (error) {
        console.log(`Error deleting product with id ${id}: `, error);

        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting product with id ${id}`,
                error: error.message
            })
        };
    }
}

export const getProductsOfPage = async (req: Request, res: Response) => {
    try {

        const page =  Number(req.query.page) > 0 ? Number(req.query.page) : 1;
        
        const limit = 10;

        const [[{ total }]] = await ProductModels.countProducts();

        const [rows] = await ProductModels.selectPageProducts(page, limit);

        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "Products not finded" : "Products finded",
            page: page,
            limit: limit,
            totalPages: totalPages
        });

    } catch (error) {
        
        console.error("Error getting products", error);

        res.status(500).json({
            message: "Internal error while retrieving products"
        });
    }
}