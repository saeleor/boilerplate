import {
  applyDecorators,
  createParamDecorator,
  SetMetadata,
  UseGuards,
  ExecutionContext,
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { Role } from '@boilerplate/util/types'
import { GqlExecutionContext } from '@nestjs/graphql'

export const AllowAuthenticated = (...roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard))

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx)
  return context.getContext().req.user
})
