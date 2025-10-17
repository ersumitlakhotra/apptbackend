import handleResponse from "../middlewares/handleResponse.js";
import { createLogoService, getAllLogoService, updateLogoService, deleteLogoService } from "../models/logoModel.js";

export const getAllLogo = async (req, res, next) => {
    try {
        const data = await getAllLogoService(req.params.cid);
        if (!data) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Fetch via Id Successfully", data);
    }
    catch (err) {
        next(err)
    }
};

export const createLogo = async (req, res, next) => {
    const { logo} = req.body;
    try {
        const user = await createLogoService(req.params.cid, logo);
        handleResponse(res, 200, "Created Successfully", user)
    }
    catch (err) {
        next(err)
    }
};
export const updateLogo = async (req, res, next) => {
    const { logo } = req.body;
    try {
        const user = await updateLogoService(req.params.cid, req.params.id, logo);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", user);
    }
    catch (err) {
        next(err)
    }
};
export const deleteLogo = async (req, res, next) => {
    try {
        const user = await deleteLogoService(req.params.cid);
        handleResponse(res, 203, "Deleted Successfully", user);
    }
    catch (err) {
        next(err)
    }
};