import { PartialType } from '@nestjs/mapped-types';
import { CreateTosspaymentDto } from './create-tosspayment.dto';

export class UpdateTosspaymentDto extends PartialType(CreateTosspaymentDto) {}
