import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManyToOneRelationPhoto, OneToOneRelationPhoto, Relation } from './entities/relation.entity';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Relation, OneToOneRelationPhoto, ManyToOneRelationPhoto, User]),
    UserModule,
  ],
  controllers: [RelationsController],
  providers: [RelationsService],
})
export class RelationsModule {}
