export class User {
    fullName: string;
    phone: number;
    password : any;
    locale ?: string ='en'; 
    
    constructor( user:User){
      this.fullName=user.fullName;
      this.phone=user.phone;
      this.password=user.password;
    }
  }

