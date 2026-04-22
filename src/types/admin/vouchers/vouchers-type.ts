export interface VoucherProp{
    name: string,
    reduceAmount: number,
    quantity: number,
    startAt: string,
    expireAt: string,
    activationCode: string
    maxUsed: number
}

export interface VoucherResponse{
    id: string,
    name: string,
    reduceAmount: number,
    quantity: number,
    startAt: Date,
    expireAt: Date,
    maxUsed: number
}
