export function createCalendar(): Date[]{
    const calendar: Date[] = []
    const startDate = new Date()
    startDate.setHours(0, 0, 0 ,0)

    calendar.push(new Date(startDate))
    for (let i = 0; i < 14; i++){
        startDate.setDate(startDate.getDate() + 1)
        calendar.push(new Date(startDate.setHours(0, 0, 0, 0)))
    }

    return calendar
}
