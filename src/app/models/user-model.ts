import { RoleDTO } from "./role-model";

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    roleId: string;
    role: RoleDTO;
}