import pool from "../config/db.js";

const tableName = "public.\"logs\"";

export const getAllLogsService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY createdat DESC `, [cid]);
    return result.rows;
};

export const getLogsByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows[0];
};
export const createLogsService = async (cid, ltype, lid, lname, userid, status, datainfo) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,ltype, lid, lname, userid, createdat, status,datainfo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [cid, ltype, lid, lname, userid, new Date(), status, datainfo]);
    return result.rows[0];
};




