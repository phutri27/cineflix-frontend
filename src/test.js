import { format } from "date-fns"

console.log(format(new Date(), "HH:mm"))
console.log(new Date().getTime())
console.log(new Date(new Date().toString().replace("Z", "")).getTime())