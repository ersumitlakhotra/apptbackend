import pool from "../config/db.js";
const tableName = "public.\"user\"";

export const getAllCompanyService = async () => {
    const result =await pool.query(`SELECT * FROM company`);
    return result.rows;
};
export const getCompanyByIdService = async (cid) => {
    const result = await pool.query(`SELECT * FROM company where id=$1`, [cid]);
    return result.rows[0];
};
export const createCompanyService = async (name, email, cell,password,  timinginfo) => {
    const result = await pool.query(`INSERT INTO company (name,email,cell,password,timinginfo,active,pricing,plan,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`, [name, email, cell, password, timinginfo, 'true','0','STARTUP', new Date(),new Date()]);
    return result.rows[0];
};

export const updateCompanyAddressInfoService = async (cid, name, cell, addressinfo) => {
    const result = await pool.query(`UPDATE company set name=$2,cell=$3,addressinfo=$4, modifiedat=$5 where id=$1 RETURNING *`, [cid, name, cell, addressinfo,new Date()]);
    return result.rows[0];
};
export const updateCompanyBillingService = async (cid, billinginfo) => {
    const result = await pool.query(`UPDATE company set billinginfo=$2, modifiedat=$3 where id=$1 RETURNING *`, [cid, billinginfo, new Date()]);
    return result.rows[0];
};
export const updateCompanySocialService = async (cid, socialinfo) => {
    const result = await pool.query(`UPDATE company set socialinfo=$2, modifiedat=$3 where id=$1 RETURNING *`, [cid, socialinfo, new Date()]);
    return result.rows[0];
};
export const updateCompanySecurityService = async (cid, password, id) => {
    const result = await pool.query(`UPDATE company set password=$2, modifiedat=$3 where id=$1 RETURNING *`, [cid, password, new Date()]);
    const user = await pool.query(`UPDATE ${tableName} set password=$3,modifiedat=$4 where id=$2 and cid=$1 RETURNING *`, [cid, id, password, new Date()]);
    return result.rows[0];
};
export const updateCompanyTimingService = async (cid, timinginfo) => {
    const result = await pool.query(`UPDATE company set timinginfo=$2, modifiedat=$3 where id=$1 RETURNING *`, [cid, timinginfo, new Date()]);
    return result.rows[0];
};