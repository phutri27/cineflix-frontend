export interface ProfileVoucher{
    data: {
        quantity: number;
        voucher: {
            id: string;
            name: string;
            reduceAmount: number;
            startAt: Date;
            expireAt: Date;
            maxUsed: number
        };
    }[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}