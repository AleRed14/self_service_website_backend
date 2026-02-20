import connection from "../database/db.ts";
import { RowDataPacket } from "mysql2";
import { IProduct } from "../../../@types/express/index.ts";

const validateUser = (email: Email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    return connection.query<RowDataPacket[] & IProduct[]>(sql, [email]);
}

export default{
    validateUser
}