class User {
    id: number
    email: string
    password: string
    deleted: boolean = false
   
    constructor(id: number, email: string, password: string){
        this.id = id
        this.email = email
        this.password = password
    }
 }
 
 export default User
