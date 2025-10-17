import pool from "../config/db.js";

const tableName = "public.\"billing\"";

export const getAllBillingService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY id DESC `, [cid]);
    return result.rows;
};

export const createBillingService = async (cid, trndate, duedate,subtotal,tax,taxamount,totalamount,status) => {
    let invoice = `INV-${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(3, '0') }`; 
    const company = await pool.query(`SELECT * FROM company where id=$1 `, [cid]);
    const companyinfo = JSON.stringify({
        name: company.name,
        addressinfo: company.addressinfo       
    });
    const result = await pool.query(`INSERT INTO ${tableName} (cid,trndate, duedate,subtotal,tax,taxamount,totalamount,status,invoice, createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`, [cid, trndate, duedate, subtotal, tax, taxamount, totalamount, status, invoice, new Date(), new Date()]);
    return result.rows[0];
};
export const updateBillingService = async (cid, id, trndate, duedate, subtotal, tax, taxamount, totalamount, status) => {
    const result = await pool.query(`UPDATE ${tableName} set trndate=$3,duedate=$4,subtotal=$5,tax=$6,taxamount=$7,totalamount=$8,status=$9,modifiedat=$10 where id=$2 and cid=$1 RETURNING *`, [cid, id, trndate, duedate, subtotal, tax, taxamount, totalamount, status, new Date()]);
    return result.rows[0];
};