import handleResponse from "../middlewares/handleResponse.js";
import { createBillingService, getAllBillingService, updateBillingService } from "../models/billingModel.js";

export const getAllBilling = async (req, res, next) => {
    try {
        const user = await getAllBillingService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const createBilling = async (req, res, next) => {
    const { trndate, duedate, subtotal, tax, taxamount, totalamount, status } = req.body;
    try {
        const user = await createBillingService(req.params.cid, trndate, duedate, subtotal, tax, taxamount, totalamount, status);
        handleResponse(res, 201, "Created Successfully", user)
    }
    catch (err) {
        next(err)
    }
};

export const updateBilling = async (req, res, next) => {
    const { trndate, duedate, subtotal, tax, taxamount, totalamount, status } = req.body;
    try {
        const user = await updateBillingService(req.params.cid, req.params.id, trndate, duedate, subtotal, tax, taxamount, totalamount, status);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", user);
    }
    catch (err) {
        next(err)
    }
};