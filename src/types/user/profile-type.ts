export interface ProfileProps{
    spending_total : number;
    member_rank: string
}

export interface BookingHistoryProps{
    data: {
        id: string;
        createdAt: Date;
        seats: {
            number: number;
            row: string;
            seatTypeDetail: {
                price: number;
                seat_type: string;
            };
        }[];
        showtime: {
            screen: {
                name: string;
                cinema: {
                    name: string;
                };
            };
            movie: {
                title: string;
                posterUrl: string;
            };
            startTime: Date;
        };
        tickets: {
            seat: {
                number: number;
                row: string;
            };
            ticketUrl: string | null;
        }[];
        snacks: {
            quantity: number;
            snack: {
                name: string;
                price: number;
            };
        }[];
        vouchers: {
            quantity: number;
            voucher: {
                name: string;
                reduceAmount: number;
            };
        }[];
        transaction: {
            amount: number;
        }[];
    }[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}