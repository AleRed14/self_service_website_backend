import connection from "../database/db.js";
import SaleModels from "../models/sale.models.js";
import { Request, Response } from "express";

export const insertSale = async (req: Request, res: Response) => {

    const conn = await connection.getConnection(); 
    
    try {
        const { date, total_price, user_name, id_products } = req.body;

        if (!date || !total_price || !user_name || !Array.isArray(id_products) || id_products.length === 0) {
            return res.status(400).json({ message: "Required fields are missing or invalid" });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).send("Invalid date format");
        }

        await conn.beginTransaction();

        const [result] = await SaleModels.insertSale(parsedDate, total_price, user_name, conn);
        const newSaleId = (result as any).insertId;

        for (const productId of id_products) {
            await SaleModels.insertSaleProduct(newSaleId, productId, conn);
        }

        await conn.commit();

        return res.status(201).json({ 
            message: "Sale and products registered!",
            saleId: newSaleId 
        });

    } catch (error) {
        await conn.rollback();
        
        console.error("Transaction Error: ", error);
        return res.status(500).json({
            message: "Transaction failed, database rolled back",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    } finally {
        conn.release();
    }
};