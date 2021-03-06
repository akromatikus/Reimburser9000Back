
export default interface user{
    id:string
    username:string
    pw:string
    isManager:boolean
    expenseHistory: expenseHistory[]
   
}

export interface expenseHistory{
    name:string
    amount:number
    reason:string
    isApproved: string
    comment: string
}