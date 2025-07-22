import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TareaDto } from "src/tareas/dto/tareas.dto";
import { Tareas } from "./tareas.schema";

@Injectable()
export class TareasService {
    constructor(
        @InjectModel('Tareas') private tareasModel: Model<TareaDto>,
        @InjectModel('Tarea') private tareasSchema: Model<Tareas>
    ){}
    //servicio para crear una tarea 
    async crearTarea(dto:TareaDto){
        const nuevaTarea = new this.tareasModel({
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            completada: dto.completada,
            fechaLimite: dto.fechaLimite,
            usuarioId: dto.usuarioId,
        });
        await nuevaTarea.save();
        console.log(nuevaTarea);
        return {
            _id: nuevaTarea._id,
            titulo: nuevaTarea.titulo,
            descripcion: nuevaTarea.descripcion,
            completada: nuevaTarea.completada,
            fechaLimite: nuevaTarea.fechaLimite,
            usuarioId: nuevaTarea.usuarioId,
        };
    }

    //servicio para editar una tarea 
    async editarTarea(id: string, dto: TareaDto) {
        const editarTarea = await this.tareasModel.findByIdAndUpdate(id, {
            titulo: dto.titulo,
            descripcion: dto.descripcion,
            completada: dto.completada,
            fechaLimite: dto.fechaLimite,
            usuarioId: dto.usuarioId,
        },{ new: true });
        if (!editarTarea) {
            throw new Error('Tarea no encontrada');
        }
        
        return {
            _id: editarTarea._id,
            titulo: editarTarea.titulo,
            descripcion: editarTarea.descripcion,
            completada: editarTarea.completada,
            fechaLimite: editarTarea.fechaLimite,
            usuarioId: editarTarea.usuarioId,
        };
    }
    //servicio para listar todas las tareas de un usuario
    async listarTareas(usuarioId: string) {
        const tareas = await this.tareasModel.find({ usuarioId });
        if (!tareas || tareas.length == 0) {
            //el usuario no tiene tareas pero es valido
            return [];
        }
        console.log(tareas);
        return tareas.map(tarea => ({
            _id: tarea._id,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            completada: tarea.completada,
            fechaLimite: tarea.fechaLimite,
            usuarioId: tarea.usuarioId,
        }));
    }

    //servicio para eliminar una tarea
    async eliminarTarea(id: string) {
        const tareaEliminada = await this.tareasModel.findByIdAndDelete(id);
        if (!tareaEliminada) {
            throw new Error('Tarea no encontrada');
        }
        return {
            _id: tareaEliminada._id,
            titulo: tareaEliminada.titulo,
            descripcion: tareaEliminada.descripcion,
            completada: tareaEliminada.completada,
            fechaLimite: tareaEliminada.fechaLimite,
            usuarioId: tareaEliminada.usuarioId,
        };
    }

    //servicio para traer una tarea por id
    async obtenerTareaId(id:string){
        const tarea = await this.tareasSchema.findById(id);
        if (!tarea) {
            throw new Error('Tarea no encontrada');
        }
        return {
            _id: tarea._id,
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            completada: tarea.completada,
            fechaCreacion: tarea.fechaCreacion,
            fechaLimite: tarea.fechaLimite,
            usuarioId: tarea.usuarioId,
        };
    }

    //servicio para marcar una tarea como completada
    async marcarTareaCompletada(id: string) {
        const tareaCompletada = await this.tareasModel.findByIdAndUpdate(id, { completada: true }, { new: true });
        if (!tareaCompletada) {
            throw new Error('Tarea no encontrada');
        }
        return {
            _id: tareaCompletada._id,
            titulo: tareaCompletada.titulo,
            descripcion: tareaCompletada.descripcion,
            completada: tareaCompletada.completada,
            fechaLimite: tareaCompletada.fechaLimite,
            usuarioId: tareaCompletada.usuarioId,
        };}
    }