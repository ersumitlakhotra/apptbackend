import { getAllCompanyService, getCompanyByIdService, createCompanyService, updateCompanySocialService, updateCompanySecurityService, updateCompanyBillingService, updateCompanyAddressInfoService, updateCompanyTimingService } from "../models/companyModel.js";
import handleResponse from "../middlewares/handleResponse.js";


export const getAllCompany = async (req,res,next) => {
    try{
        const data= await getAllCompanyService();
        handleResponse(res,200,"Fetch Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const getCompanyById = async (req, res, next) => {
    try {
        const data = await getCompanyByIdService(req.params.cid);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Fetch via Id Successfully", data);
    }
    catch (err) {
        next(err)
    }
};

export const createCompany = async (req,res,next) => {
    const { name, email, cell, password, timinginfo }= req.body;
    try{
        const data = await createCompanyService(name, email, cell, password, timinginfo);
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateCompanyAddressInfo = async (req, res, next) => {
    const {name,cell, addressinfo } = req.body;
    try {
        const data = await updateCompanyAddressInfoService(req.params.cid, name, cell, addressinfo);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", data);
    }
    catch (err) {
        next(err)
    }
};
export const updateCompanyBilling = async (req, res, next) => {
    const { billinginfo } = req.body;
    try {
        const data = await updateCompanyBillingService(req.params.cid, billinginfo);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", data);
    }
    catch (err) {
        next(err)
    }
};
export const updateCompanySocial = async (req, res, next) => {
    const { socialinfo } = req.body;
    try {
        const data = await updateCompanySocialService(req.params.cid, socialinfo);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", data);
    }
    catch (err) {
        next(err)
    }
};
export const updateCompanySecurity = async (req, res, next) => {
    const { password, id } = req.body;
    try {
        const data = await updateCompanySecurityService(req.params.cid, password,id);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", data);
    }
    catch (err) {
        next(err)
    }
};
export const updateCompanyTiming = async (req, res, next) => {
    const { timinginfo } = req.body;
    try {
        const data = await updateCompanyTimingService(req.params.cid, timinginfo);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", data);
    }
    catch (err) {
        next(err)
    }
};