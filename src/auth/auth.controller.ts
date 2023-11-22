import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { CookieLoginGuard } from './auth.cookie.guard';
import { AuthenticatedGuard, LocalAuthGuard } from './auth.session.guard';
import { GoogleAuthGuard } from './auth.google.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    @Post('/cookie/login')
    async login(@Request() req, @Response() res){
        const userInfo = await this.authService.validate(req.body.email, req.body.password);
        if(userInfo){
            res.cookie('login', JSON.stringify(userInfo),{
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 7, //milsecond
            })
        }
        return res.send({
            message: 'login success',
        });
    }

    @UseGuards(CookieLoginGuard)
    @Get('/cookie/test')
    testGuard(){
        return '로그인한 경우에만 보여야합니다.';
    }

    @UseGuards(LocalAuthGuard)
    @Post('/session/login')
    sessionLogin(@Request() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/session/test')
    testSession(@Request() req){
        return req.user;
    }

    @UseGuards(GoogleAuthGuard)
    @Get('/to-google')
    googleLogin(@Request() req){
        
    }

    @UseGuards(GoogleAuthGuard)
    @Get('/google')
    googleTest(@Request() req, @Response() res){
        const { user } = req;
        return res.send(user);
    }

    
}
