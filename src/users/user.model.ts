class User {
    id: number
    email: string
    password: string
    deleted: boolean = false
   
    constructor(id: number, email: string, password: string, deleted: boolean){
        this.id = id
        this.email = email
        this.password = password
        this.deleted = deleted
    }
 }
 
 export default User
