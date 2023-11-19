import { IsEmail, IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

export class UpdateUserDto{
    @IsEmail()
    email: string;
    
    @IsString()
    username: string;

    @IsString()
    password: string;
}