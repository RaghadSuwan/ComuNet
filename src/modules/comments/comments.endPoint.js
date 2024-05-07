import { roles } from "../../middleware/auth.js";

export const endPoint = {
    create: [roles.SuperAdmin],
    getAll: [roles.SuperAdmin],
    update: [roles.SuperAdmin],
    delete: [roles.SuperAdmin],
}