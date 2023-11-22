import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){//구문이 특이하네
    constructor(private authService: AuthService){
        super({usernameField: 'email'});//기본값은 username -> email로 변경
    }

    async validate(email: string, password: string){
        const user = await this.authService.validate(email, password);
        if(!user){
            return null;//null이면 401 error
        }
        return user;//user정보 반환
    }
}