import pool from "../config/db.js";

const tableName = "public.\"roles\"";

export const getAllRoleService = async () => {
    const result =await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
};