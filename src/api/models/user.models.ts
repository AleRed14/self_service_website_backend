import { ResultSetHeader } from "mysql2";
import conecction from "../database/db.ts";

const insertUser = (name: string, email: Email, password: string) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    return conecction.query<ResultSetHeader>(sql, [name, email, password]);
}

export default {
    insertUser
}