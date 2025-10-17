import handleResponse from "../middlewares/handleResponse.js";
import { createNotificationService, getAllNotificationService, updateNotificationService } from "../models/notificationModel.js";

export const getAllNotification = async (req, res, next) => {
    try {
        const user = await getAllNotificationService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", user);
    }
    catch (err) {
        next(err)
    }
};

export const createNotification = async (req, res, next) => {
    const { message, read } = req.body;
    try {
        const user = await createNotificationService(req.params.cid, message, read);
        handleResponse(res, 201, "Created Successfully", user)
    }
    catch (err) {
        next(err)
    }
};

export const updateNotification = async (req, res, next) => {
    const { message, read } = req.body;
    try {
        const user = await updateNotificationService(req.params.cid, req.params.id, message, read);
        if (!user) return handleResponse(res, 404, "user not found");
        handleResponse(res, 200, "Updated Successfully", user);
    }
    catch (err) {
        next(err)
    }
};