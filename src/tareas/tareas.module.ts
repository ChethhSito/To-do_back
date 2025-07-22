import { Module } from "@nestjs/common";
import { TareasService } from "./tareas.service";
import { TareasController } from "./tareas.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { TareasSchema } from "./tareas.schema";

@Module({
imports: [MongooseModule.forFeature([{ name: 'Tareas', schema: TareasSchema },
{name: 'Tarea', schema: TareasSchema }])],
controllers: [TareasController],
providers: [TareasService],
})
export class TareasModule {}