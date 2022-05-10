import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  name: string;

  @prop()
  password: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ default: [] })
  favourites?: [];
}