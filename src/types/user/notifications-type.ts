export interface Notification {
    id: string
    title: string
    content: string
    readStatus: boolean
    createdAt: string
    userId: string
}

export interface PaginatedNotifications {
    totalItems: number
    totalPages: number
    currentPage: number
}
