import pool from "../config/db.js";

const tableName = "public.\"event\"";

export const getAllEventService = async (cid, CURRENT_DATE) => {
    const result = await pool.query(`SELECT *,CASE
  WHEN ${CURRENT_DATE} between startdate AND enddate THEN 'Live'
  WHEN startdate < ${CURRENT_DATE} AND enddate < ${CURRENT_DATE}   THEN 'Past'
  WHEN startdate > ${CURRENT_DATE} AND enddate > ${CURRENT_DATE}  THEN 'Upcoming'
ELSE
  'Past'
END 

 FROM ${tableName} where cid=$1 ORDER BY id DESC`, [cid]);
    return result.rows;
};

export const getEventByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows[0];
};
export const createEventService = async (cid, title, description, startdate, enddate, serviceinfo, discount, coupon, price, total) => {
  const result = await pool.query(`INSERT INTO ${tableName} (cid,title, description, startdate, enddate,serviceinfo,discount,createdat,modifiedat,coupon, price,total) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`, [cid, title, description, startdate, enddate, serviceinfo, discount, new Date(), new Date(), coupon, price, total]);
    return result.rows[0];
};
export const updateEventService = async (cid, id, title, description, startdate, enddate, serviceinfo, discount, coupon, price, total) => {
  const result = await pool.query(`UPDATE ${tableName} set title=$3,description=$4, startdate=$5, enddate=$6, serviceinfo=$7,  discount=$8, modifiedat=$9,coupon=$10,price=$11,total=$12 where id=$2 and cid=$1 RETURNING *`, [cid, id, title, description, startdate, enddate, serviceinfo, discount, new Date(), coupon, price, total]);
    return result.rows[0];
};