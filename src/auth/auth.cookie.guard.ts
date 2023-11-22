import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class CookieLoginGuard implements CanActivate{
    constructor(private authService: AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if(req.cookies['login']){//쿠키 존재 시 인증된 것으로 판단.
            //제대로 구현하려면, parse해서 올바른 값인지까지 판단해야할 것으로 보임.
            return true;
        }

        if(!req.body.email || !req.body.password){
            return false;
        }

        const user = this.authService.validate(req.body.email, req.body.password);
        if(!user){
            return false;
        }
        req.user = user;
        return true;
    }

}