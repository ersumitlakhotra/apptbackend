import handleResponse from "../middlewares/handleResponse.js";
import { getAllPaymentService, createPaymentService, getPaymentByIdService, updatePaymentService, deletePaymentService } from "../models/paymentModel.js";

export const getAllPayment = async (req, res, next) => {
    try {
        const user = await getAllPaymentService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const createPayment = async (req, res, next) => {
    const { etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype,fromdate,todate } = req.body;
    try {
        const user = await createPaymentService(req.params.cid, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype, fromdate, todate);
        handleResponse(res, 201, "Created Successfully", user)
    }
    catch (err) {
        next(err)
    }
};

export const getAllPaymentById = async (req, res, next) => {
    try {
        const user = await getPaymentByIdService(req.params.cid, req.params.id);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Fetch via Id Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const updatePayment = async (req, res, next) => {
    const { etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype, fromdate, todate } = req.body;
    try {
        const user = await updatePaymentService(req.params.cid, req.params.id, etype, trndate, assignedto, notes, netamount, grossamount, taxamount, name, quantity, ptype, fromdate, todate);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const deletePayment = async (req, res, next) => {
    try {
        const user = await deletePaymentService(req.params.cid,req.params.id);
        handleResponse(res, 203, "Deleted Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

