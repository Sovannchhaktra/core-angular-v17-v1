export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    password?: string;
    imagePath?: string;
    status?: boolean;
    version?: number;
    isAdmin?: boolean;
    token?: string;
}
