import pool from "../config/db.js";

const tableName = "public.\"payment\"";

export const getAllPaymentService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 and deleted=0 ORDER BY id DESC`, [cid]);
    return result.rows;
};

export const getPaymentByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows[0];
};
export const createPaymentService = async (cid, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype, fromdate, todate) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype,fromdate,todate ,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`, [cid, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype,fromdate, todate, new Date(), new Date()]);
    return result.rows[0];
};
export const updatePaymentService = async (cid, id, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype, fromdate, todate) => {
    const result = await pool.query(`UPDATE ${tableName} set etype=$3,trndate=$4, assignedto=$5, notes=$6,netamount=$7, grossamount=$8, taxamount=$9, name=$10, quantity=$11, ptype=$12 ,fromdate=$13,todate=$14,  modifiedat=$15 where id=$2 and cid=$1 RETURNING *`, [cid, id, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype,fromdate, todate, new Date()]);
    return result.rows[0];
};

export const deletePaymentService = async (cid,id) => {
    const result = await pool.query(`UPDATE ${tableName} set deleted=1 where cid=$1 and id=$2 `, [cid,id]);
    return result.rows[0];
};