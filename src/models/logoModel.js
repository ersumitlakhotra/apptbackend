import pool from "../config/db.js";

const tableName = "public.\"logo\"";

export const  getAllLogoService = async (cid) => {
    const result = await pool.query(`SELECT encode(logo, 'escape') as logo,id FROM ${tableName} where cid=$1`, [cid]);
    return result.rows[0];
};
export const createLogoService = async (cid, logo) => {
    const result = await pool.query(`INSERT INTO ${tableName}(cid,logo,modifiedat) VALUES ($1,$2,$3)`, [cid, logo, new Date()]);
    return result.rows[0];
}; 

export const updateLogoService = async (cid, id,logo) => {
    const result = await pool.query(`UPDATE ${tableName} set logo=$3,modifiedat=$4 where id=$2 and cid=$1 RETURNING *`, [cid,id, logo, new Date()]);
    return result.rows[0];
}; 

export const deleteLogoService = async (cid) => {
    const result = await pool.query(`DELETE FROM ${tableName} where cid=$1 `, [cid]);
    return result.rows[0];
};