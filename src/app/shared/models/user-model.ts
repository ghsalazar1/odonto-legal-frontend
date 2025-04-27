import { RoleDTO } from "./role-model";

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    roleId: string;
    avatar: string;
    refreshToken: string,
    refreshTokenLastUsed: string,
    refreshTokenCreatedAt: string,
    forgotPasswordToken: string,
    role: RoleDTO;
}