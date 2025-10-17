import handleResponse from "../middlewares/handleResponse.js";
import { getAllRoleService } from "../models/roleModel.js";

export const getAllRoles = async (req,res,next) => {
    try{
        const data= await getAllRoleService();
        handleResponse(res,200,"Fetch Successfully",data);
    }
    catch(err){
        next(err)
    }
};