import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ManyToOneRelationPhoto } from 'src/relations/entities/relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ManyToOneRelationPhoto])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
