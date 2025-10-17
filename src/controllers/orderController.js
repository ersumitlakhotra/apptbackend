import handleResponse from "../middlewares/handleResponse.js";
import { getAllOrderService, getOrderByIdService, createOrderService,updateOrderService } from "../models/orderModel.js";


export const getAllOrder = async (req,res,next) => {
    try{
        const data = await getAllOrderService(req.params.cid);
        handleResponse(res,200,"Fetch Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const getOrderById = async (req,res,next) => {
    try{
        const data = await getOrderByIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,404,"user not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};

export const createOrder = async (req,res,next) => {
    const { customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon,taxamount }= req.body;
    try{
        const data = await createOrderService(req.params.cid, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon, taxamount);
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateOrder = async (req,res,next) => {
    const { customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon, taxamount }= req.body;
   try{
       const data = await updateOrderService(req.params.cid, req.params.id, customerinfo, serviceinfo, price, status, trndate, assignedto, slot, discount, tax, total, coupon, taxamount);
       if(!data) return handleResponse(res,404,"order not found");
       handleResponse(res,200,"Updated Successfully",data);
   }
   catch(err){
       next(err)
   }
};