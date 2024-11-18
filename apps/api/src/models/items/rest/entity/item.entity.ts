import { Item } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ItemEntity implements RestrictProperties<ItemEntity, Item> {
  name: string
  id: number
  createdAt: Date
  updatedAt: Date
  uid: string
}
