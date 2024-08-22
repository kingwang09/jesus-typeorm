import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ){}

    createUser(userDto: CreateUserDto): Promise<User> {
        /**
         * new를 해야 created가 제대로 들어감.
         * 단점) property를 수동으로 넣어줘야함.
         */
        // const newUser = new User();
        // newUser.email = userDto.email;
        // newUser.password = userDto.password;
        // newUser.username = userDto.username;

        //대안2) spread를 쓰고 차라리 date를 수동으로 넣어준다.
        const newUser: User = {
            ...userDto,
            createdAt: new Date(),
        }
        console.log('new User: ', newUser);
        return this.userRepository.save(newUser);
    }

    async getUser(email: string){
        return await this.userRepository.findOne({
            where: {
                email
            }
        });
    }

    async updateUser(userDto: UpdateUserDto){ //user를 User로 지정 시 에러남.
        const user = await this.getUser(userDto.email);
        console.log('current user :', user);
        user.username = userDto.username;
        user.password = userDto.password;
        console.log('update user :', user);
        return this.userRepository.save(user);
    }

    async deleteUser(email: string){
        const deleteResult =  await this.userRepository.delete({ email });
        console.log('delete result: ', deleteResult);
        return deleteResult.affected;
    }

    async getUserById(id: number){
        const user =  await this.userRepository.findOne({
            where: {
                id
            }
        });
        console.log('getUserById: ', user);
        return user;
    }
}
