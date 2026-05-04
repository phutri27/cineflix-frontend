interface CoupleSeatProp {
    row: string
    number: number
}

export const coupleSeatsValidate = (coupleSeats: CoupleSeatProp[]): boolean => {
    if (coupleSeats.length % 2 !== 0){
        return false
    }
    coupleSeats.sort((a, b) => a.row.localeCompare(b.row) || Number(a.number) - Number(b.number))
    const validSeats = Array.from(new Set(coupleSeats.map(seat => seat.row))).map((rowLetter) => (coupleSeats.filter(seat => seat.row === rowLetter)))
    for (const validSeat of validSeats){
        for (let i = 0; i < validSeat.length; i++){
            if (i % 2 === 0 && validSeat[i].number % 2 === 0){
                return false;
            } else if (i % 2 !== 0 && validSeat[i].number % 2 !== 0){
                return false 
            } else if (i !== validSeat.length - 1 
                && i % 2 === 0 
                && Math.abs(validSeat[i + 1].number - validSeat[i].number) !== 1){
                return false
            }
        }
    }
    
    return true
}