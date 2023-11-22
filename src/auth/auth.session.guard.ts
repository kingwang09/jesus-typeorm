import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class SessionLoginGuard implements CanActivate{
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

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const req = context.switchToHttp().getRequest();
        await super.logIn(req); //세션 저장 로직
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();//세션에서 정보를 읽어서 인증 확인
    }

}