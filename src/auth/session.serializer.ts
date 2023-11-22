import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{

    constructor(private userService: UserService){
        super();
    }

    serializeUser(user: any, done: (error: Error, user: any) => void) {
        done(null, user.email);//세션에 저장할 정보(최소한의 정보만)
    }

    async deserializeUser(payload: any, done: (error: Error, payload: any)=> void): Promise<any> {
        const user = await this.userService.getUser(payload);//email을 사용해서 회원 검증
        if(!user){
            done(new Error('유저 정보가 없습니다.'), null);
            return;
        }

        const { password, ...userInfo } = user;
        done(null, userInfo);//유저정보 반환 
    }

}