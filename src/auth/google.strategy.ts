import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: 'http://localhost:5000/auth/google',
            scope: ['email', 'profile'],
        })

    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){
        const { id, name, emails } = profile;
        console.log('accessToken: ', accessToken);
        console.log('refreshToken: ', refreshToken);

        const providerId = id;
        const email = emails[0].value;

        console.log('providerId: ',providerId);
        console.log('email: ',email);
        return profile;
    }
}