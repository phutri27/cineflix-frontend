export interface ProfileProps{
    spending_total : number;
    member_rank: string
}

export interface BookingHistoryProps{
    data: {
        id: string;
        createdAt: Date;
        tickets: {
            ticketUrl: string | null;
            seat: {
                number: number;
                row: string;
            };
        }[];
        showtime: {
            startTime: Date;
            movie: {
                title: string;
                posterUrl: string;
            };
            screen: {
                name: string;
                cinema: {
                    name: string;
                };
            };
        };
        seats: {
            number: number;
            row: string;
            seatTypeDetail: {
                price: number;
                seat_type: string;
            };
        }[];
        vouchers: {
            quantity: number;
            voucher: {
                name: string;
                reduceAmount: number;
            };
        }[];
        snacks: {
            quantity: number;
            snack: {
                name: string;
                price: number;
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