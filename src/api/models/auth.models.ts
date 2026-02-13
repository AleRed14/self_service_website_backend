import connection from "../database/db.ts";

const validateUser = (email: Email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    return connection.query(sql, [email]);
}

export default{
    validateUser
}