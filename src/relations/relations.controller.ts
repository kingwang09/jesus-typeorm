import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { CreateManyToOneRelationDto, CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { UserService } from 'src/user/user.service';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationsService: RelationsService, private readonly userService: UserService) {}

  @Post("/one-to-one")
  create(@Body() createRelationDto: CreateRelationDto) {
    return this.relationsService.create(createRelationDto);
  }

  @Post("/many-to-one")
  async manyToOneCreate(@Body() createRelationDto: CreateManyToOneRelationDto) {
    const user = await this.userService.getUserById(createRelationDto.userId);
    if(user){
      return await this.relationsService.createManyToOne(user, createRelationDto);
    }
    return 'user is empty..';
  }

  @Get()
  findAll() {
    return this.relationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelationDto: UpdateRelationDto) {
    return this.relationsService.update(+id, updateRelationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationsService.remove(+id);
  }
}
