import pool from "../config/db.js";

const tableName = "public.\"services\"";

export const getAllServicesService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY name ASC `, [cid]);
    return result.rows;
};

export const getServicesByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows[0];
};
export const createServicesService = async (cid, name, price, timing, description, status) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,name,createdat,modifiedat,price,timing,description,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [cid, name, new Date(), new Date(), price, timing, description, status]);
    return result.rows[0];
};
export const updateServicesService = async (cid, id, name, price, timing,description,status) => {
    const result = await pool.query(`UPDATE ${tableName} set name=$3,modifiedat=$4,price=$5,timing=$6,description=$7,status=$8 where id=$2 and cid=$1 RETURNING *`, [cid, id, name, new Date(), price, timing, description, status]);
    return result.rows[0];
};



