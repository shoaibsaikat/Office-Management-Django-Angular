export interface Asset {
    id: number;
    title: string;
    user: number;
    user_first_name: string;
    user_last_name: string;
    creationDate: string;
    approver: number;
    approved: boolean;
    approveDate: string;
    startDate: string;
    endDate: string;
    dayCount: number;
    comment: string;
}