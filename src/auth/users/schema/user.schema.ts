import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User{
    @Prop({required:true})
    nombre: string;

    @Prop({required:true, unique:true})
    email:string;

    @Prop({required:true})
    contrasena:string;

    @Prop({default:Date.now()})
    fechaCreacion:Date;
}
export const UserSchema = SchemaFactory.createForClass(User);