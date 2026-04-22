export interface PricingDetailProp {
    id: string
    seat_id: string
    price: string
    seat_type: string
    row: string
    number: number
}

export interface SnackData {
    snackId: string
    price: number
    quantity: number
}

export interface VoucherData {
    voucherId: string
    reduceAmount: number
    name: string
    quantity: number
    maxUsed: number
    voucherType: string
}

export interface BookingData {
    movieId: string | undefined
    showtimeId: string
    seats: PricingDetailProp[]
    snacks: SnackData[]
    vouchers: VoucherData[]
    bookingId: string
}

export interface BookingInfoResponse {
    userId: string
    movie: {
        posterUrl: string
        title: string
        rated: string
    }
    showtime: {
        id: string
        startTime: Date
        screen:{
            name: string
            cinema:{
                name: string
            }
        }
    }
    seats:{
        id: string
        row: string
        number: number
    }[]
    totalAmount: number
    vouchers: {
        voucher: {name: string, reduceAmount: number}
        quantity: number
    }[]
    snacks: {
        snack: {name: string, price: number}
        quantity: number
    }[]
}