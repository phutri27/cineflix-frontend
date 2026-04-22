export interface SnackInput {
    name: string;
    price: number;
    filename: File[];
}

export interface SnackResponse {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}