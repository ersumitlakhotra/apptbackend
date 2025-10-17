import handleResponse from "../middlewares/handleResponse.js";
import { createServicesService, getAllServicesService, getServicesByIdService, updateServicesService } from "../models/servicesModel.js";

export const getAllServices = async (req, res, next) => {
    try {
        const user = await getAllServicesService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const createServices = async (req, res, next) => {
    const { name, price, timing, description, status } = req.body;
    try {
        const user = await createServicesService(req.params.cid, name, price, timing, description, status);
        handleResponse(res, 201, "Created Successfully", user)
    }
    catch (err) {
        next(err)
    }
};

export const getAllServicesById = async (req, res, next) => {
    try {
        const user = await getServicesByIdService(req.params.cid, req.params.id);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Fetch via Id Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const updateServices = async (req, res, next) => {
    const { name, price, timing, description, status } = req.body;
    try {
        const user = await updateServicesService(req.params.cid, req.params.id, name, price, timing, description,status);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

