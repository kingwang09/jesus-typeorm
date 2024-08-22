import { Injectable } from '@nestjs/common';
import { CreateManyToOneRelationDto, CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManyToOneRelationPhoto, OneToOneRelationPhoto, Relation } from './entities/relation.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class RelationsService {
  constructor(
    @InjectRepository(Relation) 
    private relationRepository: Repository<Relation>,
    @InjectRepository(OneToOneRelationPhoto) 
    private oneToOneRelationRepository: Repository<OneToOneRelationPhoto>,
    @InjectRepository(ManyToOneRelationPhoto) 
    private manyToOneRelationRepository: Repository<ManyToOneRelationPhoto>,
  ){}
  async create(createRelationDto: CreateRelationDto) {
    const newRelation: Relation = {
      name: createRelationDto.name,
      createdAt: new Date(),
    }
    await this.relationRepository.save(newRelation);
    console.log(`created relation: ${newRelation.id}`);

    const newOneToOneRelation: OneToOneRelationPhoto = {
      url: createRelationDto.photoUrl,
      createdAt: new Date(),
      relation: newRelation,
    }
    await this.oneToOneRelationRepository.save(newOneToOneRelation);
    console.log(`created one-to-one relation: ${newOneToOneRelation.id}`);
    return `created: relation(id=${newRelation.id}) - oneToOneRelation(id=${newOneToOneRelation.id})`;
  }

  async createManyToOne(currentUser: User, createRelationDto: CreateManyToOneRelationDto){
    const newPhotos = createRelationDto.photoUrls.map((url) => {
      const newPhoto: ManyToOneRelationPhoto = {
        url,
        user: currentUser,
      };
      return newPhoto;
    });
    console.log('new photos: ', JSON.stringify(newPhotos));
    await this.manyToOneRelationRepository.save(newPhotos);
    console.log('created new photos: ', JSON.stringify(newPhotos));
    return newPhotos;
  }

  findAll() {
    return `This action returns all relations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relation`;
  }

  update(id: number, updateRelationDto: UpdateRelationDto) {
    return `This action updates a #${id} relation`;
  }

  remove(id: number) {
    return `This action removes a #${id} relation`;
  }
}
