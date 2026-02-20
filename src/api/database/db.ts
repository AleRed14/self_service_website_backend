import mysql from "mysql2/promise";
import enviroments from "../config/environments.ts";

const { database } = enviroments

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    password: database.password,
    user: database.user
})

export default connection;