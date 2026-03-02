import connection from "../database/db.js";
import SaleModels from "../models/sale.models.js";
import { Request, Response } from "express";
import ExcelJS from "exceljs";

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

export const getSalesExcel = async (req: Request, res: Response) => {
    try {
        
        const [rows] = await SaleModels.selectSoldProducts();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sales");

        worksheet.columns = [
            { header: "ID Sale", key: "sale_id", width: 10 },
            { header: "Date", key: "date", width: 25 },
            { header: "User", key: "user_name", width: 30 },
            { header: "Total", key: "total_price", width: 15 },
            { header: "Products", key: "products", width: 50 }
        ];

        rows.forEach(row => worksheet.addRow(row));

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=sales.xlsx");

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error exporting sales to Excel"
        });
    }
}

export const insertProductSale = async (req: Request, res: Response) => {
    try {
        
        const { date, total_price, user_name, products } = req.body;
        console.log(req.body);

        let [rows] = await SaleModels.insertSale(date, total_price, user_name);

        const newSaleId = rows.insertId;

        const productsData = products.map((productId: number) => [newSaleId, productId]);

        await SaleModels.selectProductSalesWhereId(productsData);

        res.status(201).json({
            message: "Sale created successfully",
            saleId: newSaleId,
            productsCount: products.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error recording the sale"
        });
    }
}