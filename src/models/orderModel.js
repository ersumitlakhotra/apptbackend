import pool from "../config/db.js";
const tableName = "public.\"order\"";

export const getAllOrderService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY order_no desc`, [cid]);
    return result.rows;
};
export const getOrderByIdService = async (cid,id) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows[0];
};
export const createOrderService = async (cid, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon, taxamount,bookedvia) => {
    const top1 = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY id desc`, [cid]);
    let order_no = 1000;
    if(top1.rowCount > 0)   
        order_no = top1.rows[0].order_no;
    order_no = order_no+1;
    const result = await pool.query(`INSERT INTO ${tableName} (cid, customerinfo, serviceinfo, price, status, trndate, assignedto, slot,createdat,modifiedat,discount,tax,total,coupon,taxamount,bookedvia,order_no) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`, [cid, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, new Date(), new Date(), discount, tax, total, coupon, taxamount, bookedvia, order_no]);
    return result.rows[0];
};
export const updateOrderService = async (cid, id, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon,taxamount) => {
    const result = await pool.query(`UPDATE ${tableName} set  customerinfo=$3, serviceinfo=$4, price=$5, status=$6, trndate=$7, assignedto=$8, slot=$9, modifiedat=$10 , discount=$11 , tax=$12 , total=$13 , coupon=$14, taxamount=$15  where id=$2 and cid=$1  RETURNING *`, [cid, id, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, new Date(), discount, tax, total, coupon,taxamount]);
    return result.rows[0];
};