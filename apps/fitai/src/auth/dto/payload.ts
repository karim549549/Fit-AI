import { Roles } from "@app/common";
export  class  Payload {
    sub: string;
    email: string;
    iat: number;
    role: string;

    constructor(sub: string, email: string  , role: string = Roles.USER  ) {
        this.sub = sub;
        this.email = email; 
        this.role = role;
        this.iat = Math.floor(Date.now() / 1000);
    }
}