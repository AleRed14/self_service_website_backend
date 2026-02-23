import connection from "../database/db.js";
import { RowDataPacket } from "mysql2";
import type { IProduct } from "../../../@types/express/index.js";

const validateUser = (email: Email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    return connection.query<RowDataPacket[] & IProduct[]>(sql, [email]);
}

export default{
    validateUser
}