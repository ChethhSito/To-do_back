import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//esquema de la tarea 
@Schema()
export class Tareas{
    @Prop({ required: true })
    titulo: string;

    @Prop({ required: true })
    descripcion: string;

    @Prop({ default: false })
    completada: boolean;

    @Prop({ default: Date.now() })
    fechaCreacion: Date;

    @Prop({ required:false, default: null })
    fechaLimite: Date;

    @Prop({required:true})
    usuarioId: string;

}

export const TareasSchema = SchemaFactory.createForClass(Tareas);