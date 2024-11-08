import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { User as UserType, $Enums } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType($Enums.AuthProviderType, {
  name: 'AuthProviderType',
})

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  // Add the below field decorator to make optional fields optional.
  // @Field({ nullable: true })
  @Field({ nullable: true })
  name: string
  uid: string
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  image: string
}
