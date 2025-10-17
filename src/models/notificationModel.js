import pool from "../config/db.js";

const tableName = "public.\"notification\"";

export const getAllNotificationService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY createdat DESC `, [cid]);
    return result.rows;
};

export const createNotificationService = async (cid, message, read) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,message, read, createdat,modifiedat) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [cid, message, read, new Date(), new Date()]);
    return result.rows[0];
};
export const updateNotificationService = async (cid, id, message, read) => {
    const result = await pool.query(`UPDATE ${tableName} set message=$3,read=$4,modifiedat=$5 where id=$2 and cid=$1 RETURNING *`, [cid, id, message, read, new Date()]);
    return result.rows[0];
};