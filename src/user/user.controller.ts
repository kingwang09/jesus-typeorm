import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import e from 'express';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    

    @Get('/:email')
    async get(@Param('email') email: string){
        const user = await this.userService.getUser(email);
        console.log('find User: ', user);
        return user;
    }

    @Post()
    async create(@Body() user: User){
        const createdUser = await this.userService.createUser(user);
        console.log('created User: ', createdUser);
        return createdUser;
    }

    @Put('/:email')
    async update(@Param('email') email: string, @Body() user: User){
        const updatedUser = await this.userService.updateUser(email, user);
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
