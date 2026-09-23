// TypeScript types
export interface AuthUser {
    id: number;
    name: string;
    email: string;
    createdAt?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}