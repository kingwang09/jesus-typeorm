import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ){}

    createUser(user: User): Promise<User> {
        let newUser = new User();
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.username = user.username;
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

    async updateUser(email: string, _user: User){ //user를 User로 지정 시 에러남.
        const user = await this.getUser(email);
        console.log('current user :', _user);
        user.username = _user.username;
        user.password = _user.password;
        console.log('update user :', user);
        return this.userRepository.save(user);
    }

    async deleteUser(email: string){
        const deleteResult =  await this.userRepository.delete({ email });
        console.log('delete result: ', deleteResult);
        return deleteResult.affected;
    }
}
