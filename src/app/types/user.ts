export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    manager_id?: number;
    token?: string;
}