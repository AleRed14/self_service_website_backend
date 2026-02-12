import { Request, Response, NextFunction } from "express";

const loggerURL = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString}] - ${req.method} - ${req.url}`);
    
    next()
}

interface ProductParams {
    id: string;
}

const validateID = (req: Request<ProductParams>, res: Response, next: NextFunction) => {
    
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: "The product ID must be a valid number."
        })
    }

    req.id = parseInt(id, 10);

    next()
}

const requiresLogin = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

export {
    loggerURL,
    validateID,
    requiresLogin
}