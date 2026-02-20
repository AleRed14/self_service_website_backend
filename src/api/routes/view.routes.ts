import { Router } from "express";
const router = Router();

import { productsView } from "../controllers/view.controllers.ts";

import { requiresLogin } from "../middlewares/middlewares.ts";

router.get("/", requiresLogin, productsView);



router.get("/consult", requiresLogin, (req, res) =>{
    res.render("consult", {
        title: "Consult",
        about: "Search for product by ID"
    });
});

router.get("/create", requiresLogin, (req, res) =>{
    res.render("create", {
        title: "Create",
        about: "Create a new product"
    });
});

router.get("/modify", requiresLogin, (req, res) =>{
    res.render("modify", {
        title: "Modify Product",
        about: "Modify a product"
    });
});

router.get("/delete", requiresLogin, (req, res) =>{
    res.render("delete", {
        title: "Delete Product",
        about: "Delete a product"
    });
});

router.get("/login", (req, res) =>{
    res.render("login",{
        title: "Login",
        about: "User login"
    });
});

export default router;