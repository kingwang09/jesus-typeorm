import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TosspaymentsService } from './tosspayments.service';
import { ConfirmWidgetTosspaymentDto, CreateTosspaymentDto } from './dto/create-tosspayment.dto';
import { UpdateTosspaymentDto } from './dto/update-tosspayment.dto';

@Controller('tosspayments')
export class TosspaymentsController {
  constructor(private readonly tosspaymentsService: TosspaymentsService) {}

  @Post('/confirm/widget')
  async confrim(@Body() confirmDto: ConfirmWidgetTosspaymentDto) {
    console.log('confirm widget: ', confirmDto);
    const result = await this.tosspaymentsService.confirmWidget(confirmDto);
    console.log('confirm result json: ', result);
    return result;
  }

  @Post()
  create(@Body() createTosspaymentDto: CreateTosspaymentDto) {
    return this.tosspaymentsService.create(createTosspaymentDto);
  }

  @Get()
  findAll() {
    return this.tosspaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tosspaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTosspaymentDto: UpdateTosspaymentDto) {
    return this.tosspaymentsService.update(+id, updateTosspaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tosspaymentsService.remove(+id);
  }
}
