import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateUser } from './dtos/create.dto'
import { UserQueryDto } from './dtos/query.dto'
import { UpdateUser } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { UserEntity } from './entity/user.entity'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUser) {
    return this.prisma.user.create({ data: createUserDto })
  }

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.user.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @Patch(':uid')
  async update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUser) {
    return this.prisma.user.update({
      where: { uid },
      data: updateUserDto,
    })
  }

  @ApiBearerAuth()
  @Delete(':uid')
  async remove(@Param('uid') uid: string) {
    return this.prisma.user.delete({ where: { uid } })
  }
}
