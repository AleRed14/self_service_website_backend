import express from "express";
import enviroments from "./src/api/config/environments.ts";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.ts"; 
import { productRoutes, userRoutes, viewRoutes, authRoutes, saleRoutes } from "./src/api/routes/index.ts";
import { __dirname, join } from "./src/api/utils/index.ts";
import session from "express-session";

const app = express();
const PORT = enviroments.port;
const session_key = enviroments.session_key;

/*=========================
    Middlewares
=========================*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(loggerURL);

app.use(express.static(join(__dirname, "src/public")));

/*================
    Config
================*/

app.set("view engine", "ejs");

app.set("views", join(__dirname, "src/views"));

if (!session_key) {
    throw new Error("ERROR: The SESSION_KEY environment variable is not defined.");
}

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

/*======================
    Routes
======================*/

app.use("/api/products", productRoutes);

app.use("/", viewRoutes);

app.use("/api/users", userRoutes);

app.use("/", authRoutes);

app.use("/", saleRoutes)

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
    
})


// app.get(, Anotacion);

// app.get("/export/sales", )

// app.post("/api/sales", );