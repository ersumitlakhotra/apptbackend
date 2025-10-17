import pool from "../config/db.js";

const tableName = "public.\"user\"";

export const getAllUsersService = async (cid) => {
    const result = await pool.query(`SELECT *,encode(profilepic, 'escape') as profilepic FROM ${tableName} where cid=$1 and role <> 'Administrator' ORDER BY fullname ASC`, [cid]);
    return result.rows;
}; 

export const getAllUsersWithAdminService = async (cid) => {
    const result = await pool.query(`SELECT *,encode(profilepic, 'escape') as profilepic FROM ${tableName} where cid=$1 ORDER BY fullname ASC`, [cid]);
    return result.rows;
};

export const getUserAuthService = async (username, password) => {
    const result = await pool.query(`SELECT U.*,C.active FROM ${tableName} U INNER JOIN company C on (C.id = U.cid) where c.active=true and status='Active' and username=$1 and U.password=$2`, [username, password]);
    return result.rows[0];
};

export const getUserByIdService = async (cid,id) => {
    const result =await pool.query(`SELECT * FROM ${tableName} where id=$1 and cid=$2`,[id,cid]);
    return result.rows[0];
};
export const createUserService = async (cid, password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,username,password,role,permissioninfo,status,createdat,modifiedat,email,cell,rating,profilepic,fullname,accounttype,address,gender) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`, [cid, email, password, role, permissioninfo, status, new Date(), new Date(), email, cell, rating, profilepic, fullname, accounttype, address, gender]);
    {/*const id = result.rows[0].id;
    const splitName = fullname.split(' ');
    const username = `${splitName[0]}${id}${cid}`;
    await pool.query(`UPDATE ${tableName} set username=$3 where id=$2 and cid=$1 RETURNING *`, [cid, id, username]);*/}
    return result.rows[0];
};
export const updateUserService = async (cid, id, password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender) => {
    const result = await pool.query(`UPDATE ${tableName} set password=$3,role=$4,permissioninfo=$5,email=$6, cell=$7, rating=$8, status=$9, profilepic=$10, fullname=$11, accounttype=$12, address=$13, gender=$14,modifiedat=$15 where id=$2 and cid=$1 RETURNING *`, [cid, id, password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender, new Date()]);
    return result.rows[0];
};
export const deleteUserService = async (cid,id) => {
    const result =await pool.query(`DELETE FROM ${tableName} where id=$1 and cid=$2 RETURNING *`,[id,cid]);
    return result.rows[0];
};
