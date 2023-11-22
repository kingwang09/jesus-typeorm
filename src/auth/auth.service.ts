import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async register(userDto: CreateUserDto){
        const user = await this.userService.getUser(userDto.email);

        if(user){
            throw new HttpException('이미 존재하는 회원입니다.', HttpStatus.BAD_REQUEST);
        }

        const encryptPassword = bcrypt.hashSync(userDto.password, 10);

        try{
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptPassword,
            });
            user.password = undefined;
            return user;
        }catch(error){
            throw new HttpException('유저 등록 실패', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validate(email: string, password: string){
        const user = await this.userService.getUser(email);
        if(!user){
            return null;
        }

        const { password: hashedPassword, ...userInfo } = user;
        if(bcrypt.compareSync(password, hashedPassword)){
            return userInfo;
        }
        return null;
    }
}