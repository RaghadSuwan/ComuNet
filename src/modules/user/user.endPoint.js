import { roles } from "../../middleware/auth.js";

export const endPoint = {
    uploadUserExcel: [roles.SuperAdmin],
    getUsers: [roles.SuperAdmin],
    updatePassword: [roles.SuperAdmin],
}