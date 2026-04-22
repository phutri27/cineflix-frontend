export interface UserResponse {
    email: string,
    first_name: string,
    last_name: string,
    profile: {
        spending_total: number,
        member_rank: string
    }
}
