export interface Requisition {
    id: number;
    name: string;
    unit: string;
    total: number;
    approver: number;
    distributor?: number;
    approved?: boolean;
    distributed?: boolean;
    title: string;
    amount: number;
    comment?: string;
    date: string;
}