import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import e from 'express';
import { User } from './user.entity';
import { encryptTransformer, getEncryptTransformer } from 'src/utils/encrypt-transformer';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    

    @Get('/:email')
    async get(@Param('email') email: string){
        console.log('email: ', getEncryptTransformer().to(email));
        const user = await this.userService.getUser(email);
        console.log('find User: ', user);
        return user;
    }

    @Post()
    async create(@Body() userDto: CreateUserDto){
        console.log('before created UserDto:', userDto);
        const createdUser = await this.userService.createUser(userDto);
        console.log('created User: ', createdUser);
        return createdUser;
    }

    @Put()
    async update(@Body() userDto: UpdateUserDto){
        const updatedUser = await this.userService.updateUser(userDto);
        console.log('updated user: ', updatedUser);
        return updatedUser;
    }

    @Delete('/:email')
    async delete(@Param('email') email: string){
        const result = this.userService.deleteUser(email);
        console.log('delete: ', result);
        return result;
    }
}
