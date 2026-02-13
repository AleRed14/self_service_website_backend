import ProductModels from "../models/product.models.js";
import { Request, Response } from "express";

function limitCharacters(text: string) {
  let truncatedText = text;
  if (truncatedText.length > 30) {
    truncatedText = truncatedText.slice(0, 30);
    truncatedText += "...";
  }
  return truncatedText;
}

export const productsView = async (req: Request, res: Response) => {
    try {

        const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;

        const limit = 10;

        const [[{ total }]] = await ProductModels.countProducts();

        const totalPages = Math.ceil(total / limit);

        const [rows] = await ProductModels.selectPageProducts(page, limit);
        
        res.render("index", {
            title: "Self Service Proyect",
            about: "Main listing",
            products: rows,
            currentPage: page,
            totalPages: totalPages,
            limitCharacters
        });

    } catch (error) {
        console.error(error);
        
    }
}