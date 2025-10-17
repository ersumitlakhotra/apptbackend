import { getAllUsersService, getUserAuthService, createUserService, getUserByIdService, updateUserService, deleteUserService, getAllUsersWithAdminService } from "../models/userModel.js";
import handleResponse from "../middlewares/handleResponse.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await getAllUsersService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
}; 

export const getAllUsersWithAdmin = async (req, res, next) => {
    try {
        const user = await getAllUsersWithAdminService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const getUserAuth = async (req,res,next) => {
    try{
        const user= await getUserAuthService(req.params.username,req.params.password);
        if(!user) return handleResponse(res,404,"user not found");
        handleResponse(res,200,"Fetch Successfully",user);
    }
    catch(err){
        next(err)
    }
};

export const createUser = async (req,res,next) => {
    const { password, role, permissioninfo,email,cell,rating,status,profilepic,fullname,accounttype,address,gender}= req.body;
    try{
        const user = await createUserService(req.params.cid, password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender);
        handleResponse(res,201,"Created Successfully",user)
    }
    catch(err){
        next(err)
    }
};

export const getAllUserById = async (req,res,next) => {
    try{
        const user= await getUserByIdService(req.params.cid,req.params.id);
        if(!user) return handleResponse(res,404,"user not found");
        handleResponse(res,200,"Fetch via Id Successfully",user);
    }
    catch(err){
        next(err)
    }
};

export const updateUser = async (req,res,next) => {
    const { password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender }= req.body;
    try{
        const user = await updateUserService(req.params.cid, req.params.id, password, role, permissioninfo, email, cell, rating, status, profilepic, fullname, accounttype, address, gender);
        if(!user) return handleResponse(res,404,"user not found");
        handleResponse(res,200,"Updated Successfully",user);
    }
    catch(err){
        next(err)
    }
};


export const deleteUser = async (req,res,next) => {  
    try{
        const user= await deleteUserService(req.params.cid,req.params.id);
        if(!user) return handleResponse(res,404,"user not found");
        handleResponse(res,200,"Deleted Successfully",user);
    }
    catch(err){
        next(err)
    }
};
