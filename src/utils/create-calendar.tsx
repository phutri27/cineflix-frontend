export function createCalendar(): Date[]{
    const calendar: Date[] = []
    const startDate = new Date()

    for (let i = 0; i < 14; i++){
        calendar.push(new Date(startDate))
        startDate.setDate(startDate.getDate() + 1)
    }

    return calendar
}
