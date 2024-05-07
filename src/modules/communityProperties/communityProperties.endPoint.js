import { roles } from "../../middleware/auth.js";

export const endPoint = {
    addProperty: [roles.SuperAdmin],
    viewProperty: [roles.SuperAdmin],
    deleteProperty: [roles.SuperAdmin],
    updateProperty: [roles.SuperAdmin],
}