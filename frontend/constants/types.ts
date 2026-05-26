


export type AdminRole = 'admin' | 'superadmin';


export interface AdminUser {
    email: string;
    username: string;
    passwordHash: string;
    role: AdminRole;
    isActive: boolean;
}